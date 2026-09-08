import { useMemo, useState } from 'react'
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  deleteEntry,
  formatCents,
  listEntries,
  type DeleteEntryResult,
  type DeleteScope,
  type Entry,
} from '../api'
import { errorMessage, financeKeys } from '../constants'
import { ErrorState } from '@/features/health/components/StateViews'
import { useToast } from '@/providers/ToastProvider'

function formatDateBR(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split('-')
  return `${d}/${m}/${y}`
}

/**
 * Exclusão de lançamento com alcance em série.
 *
 * Fora de série (sem recurrence_group_id) é a confirmação simples de sempre.
 * Em parcelamento/recorrência, carrega o grupo e oferece os três escopos da
 * API — só este, este e os próximos previstos, a série inteira — mostrando
 * quantos lançamentos cada um alcança e quantos já estão pagos, para o
 * usuário decidir com o número na frente.
 */
export function DeleteEntryDialog({
  entry,
  kindLabel,
  onClose,
  onDeleted,
}: {
  entry: Entry
  /** "despesa" | "receita" — só para os textos. */
  kindLabel: string
  onClose: () => void
  onDeleted?: (res: DeleteEntryResult) => void
}) {
  const qc = useQueryClient()
  const { show } = useToast()
  const groupId = entry.recurrence_group_id ?? null
  const isSeries = Boolean(groupId)
  const isRecurring = entry.recurrence !== 'none'
  const isInstallment = Boolean(entry.installment_number && entry.installment_total)
  const seriesNoun = isInstallment ? 'parcelamento' : 'recorrência'
  const itemNoun = isInstallment ? 'parcela' : 'ocorrência'
  const itemNounPlural = isInstallment ? 'parcelas' : 'ocorrências'

  const [scope, setScope] = useState<DeleteScope>('one')

  const groupQuery = useQuery({
    queryKey: financeKeys.entries({ recurrence_group_id: groupId, limit: 500 }),
    queryFn: () => listEntries({ recurrence_group_id: groupId as string, limit: 500 }),
    enabled: isSeries,
  })

  // Contagens por escopo, espelhando a regra do backend.
  const counts = useMemo(() => {
    const items = groupQuery.data?.items ?? []
    const paidAll = items.filter((e) => e.status === 'realizada').length
    const futureOthers = items.filter(
      (e) => e.id !== entry.id && e.status === 'prevista' && e.due_date >= entry.due_date,
    )
    return {
      total: items.length,
      paidAll,
      // future: em recorrência o âncora vira cancelado, não excluído.
      future: futureOthers.length + (isRecurring ? 0 : 1),
      futureOthers: futureOthers.length,
      anchorPaid: entry.status === 'realizada',
    }
  }, [groupQuery.data, entry, isRecurring])

  const mutation = useMutation({
    mutationFn: () => deleteEntry(entry.id, isSeries ? scope : 'one'),
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: financeKeys.all })
      const cap = kindLabel.charAt(0).toUpperCase() + kindLabel.slice(1)
      if (res.scope === 'one') {
        show(`${cap} excluída.`)
      } else {
        const parts = [`${res.deleted} ${res.deleted === 1 ? 'lançamento excluído' : 'lançamentos excluídos'}`]
        if (res.deleted_paid > 0) parts.push(`${res.deleted_paid} já pago(s)`)
        if (res.deleted_residuals > 0) parts.push(`${res.deleted_residuals} residual(is)`)
        if (res.recurrence_ended) parts.push('recorrência encerrada')
        show(parts.join(' · ') + '.')
      }
      onDeleted?.(res)
      onClose()
    },
  })

  const loading = mutation.isPending
  const ready = !isSeries || groupQuery.isSuccess

  const confirmLabel = (() => {
    if (!isSeries || scope === 'one') return 'Excluir'
    if (scope === 'future') return isRecurring ? 'Excluir e encerrar' : `Excluir ${counts.future}`
    return `Excluir ${counts.total}`
  })()

  return (
    <Dialog open onClose={loading ? undefined : onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 800 }}>Excluir {kindLabel}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          {mutation.isError && <ErrorState message={errorMessage(mutation.error)} />}

          <DialogContentText>
            &quot;{entry.description}&quot; — {formatDateBR(entry.due_date)} · {formatCents(entry.amount_cents)}
            {isInstallment && ` · parcela ${entry.installment_number} de ${entry.installment_total}`}
            . Esta ação não pode ser desfeita.
          </DialogContentText>

          {isSeries && groupQuery.isLoading && (
            <Stack spacing={1}>
              <Skeleton height={36} />
              <Skeleton height={36} />
              <Skeleton height={36} />
            </Stack>
          )}
          {isSeries && groupQuery.isError && <ErrorState message={errorMessage(groupQuery.error)} />}

          {isSeries && groupQuery.isSuccess && (
            <FormControl>
              <RadioGroup value={scope} onChange={(e) => setScope(e.target.value as DeleteScope)}>
                <FormControlLabel
                  value="one"
                  control={<Radio />}
                  label={
                    <Stack spacing={0}>
                      <Typography variant="body2" fontWeight={700}>
                        Só {isInstallment ? 'esta parcela' : 'este lançamento'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {`As outras ${counts.total - 1} ${itemNounPlural} do ${seriesNoun} ficam como estão.`}
                      </Typography>
                    </Stack>
                  }
                />
                <FormControlLabel
                  value="future"
                  control={<Radio />}
                  disabled={counts.futureOthers === 0 && isRecurring}
                  label={
                    <Stack spacing={0}>
                      <Typography variant="body2" fontWeight={700}>
                        {isInstallment ? 'Esta e as próximas parcelas previstas' : 'Esta e as próximas previstas'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {isRecurring
                          ? `Encerra a recorrência: esta ${itemNoun} vira cancelada e ${counts.futureOthers} prevista(s) a partir de ${formatDateBR(entry.due_date)} são excluídas. Pagas ficam.`
                          : `${counts.future} ${itemNounPlural}: esta + ${counts.futureOthers} prevista(s) a partir de ${formatDateBR(entry.due_date)}. Pagas e anteriores ficam.`}
                      </Typography>
                    </Stack>
                  }
                />
                <FormControlLabel
                  value="all"
                  control={<Radio />}
                  label={
                    <Stack spacing={0}>
                      <Typography variant="body2" fontWeight={700}>
                        {isInstallment ? 'Todo o parcelamento' : 'Toda a recorrência'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {`${counts.total} ${itemNounPlural}, inclusive ${counts.paidAll} já paga(s)${isRecurring ? ' e as canceladas' : ''}.`}
                      </Typography>
                    </Stack>
                  }
                />
              </RadioGroup>
            </FormControl>
          )}

          {isSeries && scope === 'all' && counts.paidAll > 0 && (
            <Alert severity="warning">
              {counts.paidAll} {itemNounPlural.slice(0, -1)}(s) já paga(s) fazem parte do histórico de caixa. Excluir
              muda o realizado dos meses anteriores. Se o {seriesNoun} existiu de fato, prefira
              &quot;esta e as próximas&quot;.
            </Alert>
          )}
          {isSeries && scope === 'one' && counts.anchorPaid && (
            <Alert severity="info">Esta {itemNoun} está paga: excluir remove o pagamento do realizado do mês.</Alert>
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={loading} color="inherit">
          Cancelar
        </Button>
        <Button
          onClick={() => mutation.mutate()}
          disabled={loading || !ready}
          color="error"
          variant="contained"
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
