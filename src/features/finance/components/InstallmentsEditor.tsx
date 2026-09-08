import {
  Box,
  Button,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded'
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded'
import { formatCents, reaisToCents } from '../api'
import { markOverdueAsPaid, todayISO, type InstallmentRow } from '../installments'
import { MoneyField } from '@/components/fields/MoneyField'

/**
 * Editor parcela a parcela do lançamento parcelado: vencimento, valor e
 * liquidação (data e valor pago) de cada uma. Serve ao parcelamento antigo —
 * parcelas passadas já pagas, valores que variaram — sem confirmar uma a uma
 * depois de criar.
 *
 * As linhas nascem da progressão mensal do formulário (Regerar volta a ela);
 * a ordem final é por vencimento, numerada pelo backend.
 */
export function InstallmentsEditor({
  rows,
  onChange,
  onRegenerate,
  disabled = false,
}: {
  rows: InstallmentRow[]
  onChange: (rows: InstallmentRow[]) => void
  onRegenerate: () => void
  disabled?: boolean
}) {
  const update = (i: number, patch: Partial<InstallmentRow>) => {
    const next = rows.slice()
    next[i] = { ...next[i], ...patch }
    onChange(next)
  }
  const togglePaid = (i: number, paid: boolean) => {
    const r = rows[i]
    update(i, {
      paid,
      paid_at: paid ? r.paid_at || r.due_date : '',
      paid_amount: paid ? r.paid_amount || r.amount : '',
    })
  }

  const totalCents = rows.reduce((acc, r) => acc + reaisToCents(r.amount), 0)
  const paidRows = rows.filter((r) => r.paid)
  const paidCents = paidRows.reduce((acc, r) => acc + reaisToCents(r.paid_amount), 0)
  const today = todayISO()
  const overdueUnpaid = rows.filter((r) => r.due_date && r.due_date <= today && !r.paid).length

  return (
    <Stack spacing={1.5}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="space-between" alignItems={{ sm: 'center' }}>
        <Typography variant="subtitle2" fontWeight={700}>
          Parcelas ({rows.length})
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            startIcon={<DoneAllRoundedIcon />}
            disabled={disabled || overdueUnpaid === 0}
            onClick={() => onChange(markOverdueAsPaid(rows))}
          >
            Marcar vencidas como pagas{overdueUnpaid > 0 ? ` (${overdueUnpaid})` : ''}
          </Button>
          <Button size="small" color="inherit" startIcon={<RestartAltRoundedIcon />} disabled={disabled} onClick={onRegenerate}>
            Regerar
          </Button>
        </Stack>
      </Stack>

      <TableContainer sx={{ maxHeight: 360, overflowX: 'auto' }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 40 }}>#</TableCell>
              <TableCell sx={{ minWidth: 150 }}>Vencimento</TableCell>
              <TableCell sx={{ minWidth: 130 }}>Valor</TableCell>
              <TableCell padding="checkbox" align="center">
                Paga
              </TableCell>
              <TableCell sx={{ minWidth: 150 }}>Pago em</TableCell>
              <TableCell sx={{ minWidth: 130 }}>Valor pago</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r, i) => (
              <TableRow key={i} hover>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {i + 1}
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    type="date"
                    size="small"
                    fullWidth
                    value={r.due_date}
                    disabled={disabled}
                    onChange={(e) => update(i, { due_date: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                  />
                </TableCell>
                <TableCell>
                  <MoneyField
                    size="small"
                    fullWidth
                    value={r.amount}
                    disabled={disabled}
                    onChange={(e) => update(i, { amount: e.target.value })}
                  />
                </TableCell>
                <TableCell padding="checkbox" align="center">
                  <Checkbox
                    size="small"
                    checked={r.paid}
                    disabled={disabled}
                    onChange={(e) => togglePaid(i, e.target.checked)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="date"
                    size="small"
                    fullWidth
                    value={r.paid_at}
                    disabled={disabled || !r.paid}
                    onChange={(e) => update(i, { paid_at: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                  />
                </TableCell>
                <TableCell>
                  <MoneyField
                    size="small"
                    fullWidth
                    value={r.paid_amount}
                    disabled={disabled || !r.paid}
                    onChange={(e) => update(i, { paid_amount: e.target.value })}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box>
        <Typography variant="caption" color="text.secondary">
          Total {formatCents(totalCents)}
          {paidRows.length > 0 && ` · ${paidRows.length} paga(s) somando ${formatCents(paidCents)}`}
          {paidRows.length > 0 && ` · ${rows.length - paidRows.length} prevista(s)`}
        </Typography>
      </Box>
    </Stack>
  )
}
