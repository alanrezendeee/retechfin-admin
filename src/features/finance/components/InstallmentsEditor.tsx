import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
  type Theme,
} from '@mui/material'
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded'
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded'
import { formatCents, reaisToCents } from '../api'
import { markOverdueAsPaid, todayISO, type InstallmentRow } from '../installments'
import { MoneyField } from '@/components/fields/MoneyField'

/**
 * Área rolável da lista: só ela rola (não o dialog), com barra temática —
 * discreta mas sempre visível (o macOS esconde a nativa até o hover).
 */
const scrollSx = (theme: Theme) => ({
  maxHeight: { xs: '46vh', sm: 380 },
  overflowY: 'auto' as const,
  overflowX: 'hidden' as const,
  pr: 0.5,
  scrollbarGutter: 'stable' as const,
  scrollbarWidth: 'thin' as const,
  scrollbarColor: `${alpha(theme.palette.primary.main, 0.45)} ${alpha(theme.palette.text.primary, 0.06)}`,
  '&::-webkit-scrollbar': { width: 8 },
  '&::-webkit-scrollbar-track': {
    background: alpha(theme.palette.text.primary, 0.06),
    borderRadius: 8,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: alpha(theme.palette.primary.main, 0.45),
    borderRadius: 8,
    border: `2px solid ${theme.palette.background.paper}`,
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.75),
  },
})

function formatDateBR(iso: string): string {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

/**
 * Editor parcela a parcela do lançamento parcelado: vencimento, valor e
 * liquidação (data e valor pago) de cada uma. Serve ao parcelamento antigo —
 * parcelas passadas já pagas, valores que variaram — sem confirmar uma a uma
 * depois de criar.
 *
 * Desktop: tabela compacta. Mobile: um card por parcela. Nos dois, só a lista
 * rola; cabeçalho (ações) e rodapé (totais) ficam fixos.
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
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const today = todayISO()

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
  const overdueUnpaid = rows.filter((r) => r.due_date && r.due_date <= today && !r.paid).length

  const statusChip = (r: InstallmentRow) => {
    if (r.paid) return <Chip size="small" color="success" variant="outlined" label="Paga" />
    if (r.due_date && r.due_date <= today) return <Chip size="small" color="warning" variant="outlined" label="Vencida" />
    return <Chip size="small" variant="outlined" label="Prevista" />
  }

  const header = (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={1}
      justifyContent="space-between"
      alignItems={{ xs: 'stretch', sm: 'center' }}
    >
      <Typography variant="subtitle2" fontWeight={700}>
        Parcelas ({rows.length})
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Button
          size="small"
          variant="outlined"
          startIcon={<DoneAllRoundedIcon />}
          disabled={disabled || overdueUnpaid === 0}
          onClick={() => onChange(markOverdueAsPaid(rows))}
        >
          Marcar vencidas como pagas{overdueUnpaid > 0 ? ` (${overdueUnpaid})` : ''}
        </Button>
        <Button
          size="small"
          color="inherit"
          startIcon={<RestartAltRoundedIcon />}
          disabled={disabled}
          onClick={onRegenerate}
        >
          Regerar
        </Button>
      </Stack>
    </Stack>
  )

  const footer = (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0.5, sm: 2 }} sx={{ pt: 1 }}>
      <Typography variant="body2">
        Total <strong>{formatCents(totalCents)}</strong>
      </Typography>
      {paidRows.length > 0 && (
        <Typography variant="body2" color="success.main">
          {paidRows.length} paga(s) · {formatCents(paidCents)}
        </Typography>
      )}
      {paidRows.length > 0 && (
        <Typography variant="body2" color="text.secondary">
          {rows.length - paidRows.length} prevista(s) · {formatCents(totalCents - paidRows.reduce((a, r) => a + reaisToCents(r.amount), 0))}
        </Typography>
      )}
    </Stack>
  )

  if (isMobile) {
    return (
      <Stack spacing={1.5}>
        {header}
        <Box sx={scrollSx}>
          <Stack spacing={1.25}>
            {rows.map((r, i) => (
              <Paper key={i} variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                <Stack spacing={1.25}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle2" fontWeight={700}>
                      Parcela {i + 1}
                    </Typography>
                    {statusChip(r)}
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <TextField
                      type="date"
                      size="small"
                      label="Vencimento"
                      fullWidth
                      value={r.due_date}
                      disabled={disabled}
                      onChange={(e) => update(i, { due_date: e.target.value })}
                      InputLabelProps={{ shrink: true }}
                    />
                    <MoneyField
                      size="small"
                      label="Valor"
                      fullWidth
                      value={r.amount}
                      disabled={disabled}
                      onChange={(e) => update(i, { amount: e.target.value })}
                    />
                  </Stack>
                  <FormControlLabel
                    sx={{ ml: -0.5 }}
                    control={
                      <Checkbox
                        size="small"
                        checked={r.paid}
                        disabled={disabled}
                        onChange={(e) => togglePaid(i, e.target.checked)}
                      />
                    }
                    label={<Typography variant="body2">Já paga</Typography>}
                  />
                  {r.paid && (
                    <Stack direction="row" spacing={1}>
                      <TextField
                        type="date"
                        size="small"
                        label="Pago em"
                        fullWidth
                        value={r.paid_at}
                        disabled={disabled}
                        onChange={(e) => update(i, { paid_at: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                      />
                      <MoneyField
                        size="small"
                        label="Valor pago"
                        fullWidth
                        value={r.paid_amount}
                        disabled={disabled}
                        onChange={(e) => update(i, { paid_amount: e.target.value })}
                      />
                    </Stack>
                  )}
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Box>
        <Divider />
        {footer}
      </Stack>
    )
  }

  return (
    <Stack spacing={1.5}>
      {header}
      <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2, ...scrollSx(theme) }}>
        <Table size="small" stickyHeader sx={{ '& td, & th': { px: 1 } }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 44 }}>#</TableCell>
              <TableCell sx={{ width: '22%' }}>Vencimento</TableCell>
              <TableCell sx={{ width: '20%' }}>Valor</TableCell>
              <TableCell align="center" sx={{ width: 64 }}>
                Paga
              </TableCell>
              <TableCell sx={{ width: '22%' }}>Pago em</TableCell>
              <TableCell sx={{ width: '20%' }}>Valor pago</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r, i) => (
              <TableRow
                key={i}
                hover
                sx={r.paid ? { bgcolor: (t) => alpha(t.palette.success.main, 0.06) } : undefined}
              >
                <TableCell>
                  <Typography variant="body2" color="text.secondary" fontWeight={700}>
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
                <TableCell align="center">
                  <Checkbox
                    size="small"
                    checked={r.paid}
                    disabled={disabled}
                    onChange={(e) => togglePaid(i, e.target.checked)}
                    inputProps={{ 'aria-label': `Parcela ${i + 1} paga` }}
                  />
                </TableCell>
                <TableCell>
                  {r.paid ? (
                    <TextField
                      type="date"
                      size="small"
                      fullWidth
                      value={r.paid_at}
                      disabled={disabled}
                      onChange={(e) => update(i, { paid_at: e.target.value })}
                      InputLabelProps={{ shrink: true }}
                    />
                  ) : (
                    <Typography variant="caption" color="text.disabled">
                      {r.due_date && r.due_date <= today ? `vencida em ${formatDateBR(r.due_date)}` : '—'}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {r.paid ? (
                    <MoneyField
                      size="small"
                      fullWidth
                      value={r.paid_amount}
                      disabled={disabled}
                      onChange={(e) => update(i, { paid_amount: e.target.value })}
                    />
                  ) : (
                    <Typography variant="caption" color="text.disabled">
                      —
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {footer}
    </Stack>
  )
}
