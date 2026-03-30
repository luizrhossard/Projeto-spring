'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  ClipboardList
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import api, { InsumoResponse, InsumoRequest, MovimentoEstoqueRequest } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'

const TIPOS_INSUMO = [
  { value: 'FERTILIZANTE', label: 'Fertilizante' },
  { value: 'DEFENSIVO', label: 'Defensivo' },
  { value: 'SEMENTE', label: 'Semente' },
  { value: 'HERBICIDA', label: 'Herbicida' },
  { value: 'INSETICIDA', label: 'Inseticida' },
  { value: 'FUNGICIDA', label: 'Fungicida' },
  { value: 'OUTROS', label: 'Outros' },
]

const UNIDADES = [
  { value: 'KG', label: 'Quilograma (kg)' },
  { value: 'G', label: 'Grama (g)' },
  { value: 'L', label: 'Litro (L)' },
  { value: 'ML', label: 'Mililitro (mL)' },
  { value: 'UN', label: 'Unidade (un)' },
  { value: 'SC', label: 'Saca (sc)' },
  { value: 'TON', label: 'Tonelada (ton)' },
]

export default function InsumosPage() {
  const [insumos, setInsumos] = useState<InsumoResponse[]>([])
  const [filteredInsumos, setFilteredInsumos] = useState<InsumoResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isMovimentoDialogOpen, setIsMovimentoDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedInsumo, setSelectedInsumo] = useState<InsumoResponse | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTipo, setFilterTipo] = useState<string>('todos')
  const [filterStatus, setFilterStatus] = useState<string>('todos')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [formData, setFormData] = useState<InsumoRequest>({
    nome: '',
    tipo: 'FERTILIZANTE',
    quantidade: 0,
    unidade: 'KG',
    precoUnitario: 0,
    dataValidade: '',
    fornecedor: '',
    estoqueMinimo: 10,
  })

  const [movimentoData, setMovimentoData] = useState<{
    tipo: 'ENTRADA' | 'SAIDA'
    quantidade: number
    motivo: string
    responsavel: string
  }>({
    tipo: 'ENTRADA',
    quantidade: 0,
    motivo: '',
    responsavel: '',
  })

  const { toast } = useToast()

  useEffect(() => {
    carregarInsumos()
  }, [])

  useEffect(() => {
    filtrarInsumos()
  }, [insumos, searchTerm, filterTipo, filterStatus])

  const carregarInsumos = async () => {
    try {
      setIsLoading(true)
      const data = await api.insumos.getAll()
      setInsumos(data)
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os insumos',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filtrarInsumos = () => {
    let filtered = [...insumos]

    if (searchTerm) {
      filtered = filtered.filter(
        (i) =>
          i.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          i.fornecedor?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterTipo !== 'todos') {
      filtered = filtered.filter((i) => i.tipo === filterTipo)
    }

    if (filterStatus === 'baixo') {
      filtered = filtered.filter((i) => i.estoqueBaixo)
    } else if (filterStatus === 'normal') {
      filtered = filtered.filter((i) => !i.estoqueBaixo)
    }

    setFilteredInsumos(filtered)
  }

  const handleOpenDialog = (insumo?: InsumoResponse) => {
    if (insumo) {
      setFormData({
        nome: insumo.nome,
        tipo: insumo.tipo,
        quantidade: insumo.quantidade,
        unidade: insumo.unidade,
        precoUnitario: insumo.precoUnitario,
        dataValidade: insumo.dataValidade || '',
        fornecedor: insumo.fornecedor || '',
        estoqueMinimo: insumo.estoqueMinimo,
      })
      setSelectedInsumo(insumo)
      setIsEditDialogOpen(true)
    } else {
      setFormData({
        nome: '',
        tipo: 'FERTILIZANTE',
        quantidade: 0,
        unidade: 'KG',
        precoUnitario: 0,
        dataValidade: '',
        fornecedor: '',
        estoqueMinimo: 10,
      })
      setSelectedInsumo(null)
      setIsDialogOpen(true)
    }
  }

  const handleSubmit = async () => {
    try {
      if (selectedInsumo) {
        await api.insumos.update(selectedInsumo.id, formData)
        toast({
          title: 'Sucesso',
          description: 'Insumo atualizado com sucesso',
        })
      } else {
        await api.insumos.create(formData)
        toast({
          title: 'Sucesso',
          description: 'Insumo cadastrado com sucesso',
        })
      }
      setIsDialogOpen(false)
      setIsEditDialogOpen(false)
      carregarInsumos()
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar o insumo',
        variant: 'destructive',
      })
    }
  }

  const handleDelete = async () => {
    if (!selectedInsumo) return

    try {
      await api.insumos.delete(selectedInsumo.id)
      toast({
        title: 'Sucesso',
        description: 'Insumo excluído com sucesso',
      })
      setIsDeleteDialogOpen(false)
      carregarInsumos()
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o insumo',
        variant: 'destructive',
      })
    }
  }

  const handleRegistrarMovimento = async () => {
    if (!selectedInsumo) return

    try {
      const movimento: MovimentoEstoqueRequest = {
        insumoId: selectedInsumo.id,
        tipo: movimentoData.tipo,
        quantidade: movimentoData.quantidade,
        motivo: movimentoData.motivo || (movimentoData.tipo === 'ENTRADA' ? 'Entrada de estoque' : 'Saída de estoque'),
        responsavel: movimentoData.responsavel || 'Usuário',
      }
      await api.insumos.registrarMovimento(movimento)
      toast({
        title: 'Sucesso',
        description: `Movimento de ${movimentoData.tipo.toLowerCase()} registrado com sucesso`,
      })
      setIsMovimentoDialogOpen(false)
      setMovimentoData({
        tipo: 'ENTRADA',
        quantidade: 0,
        motivo: '',
        responsavel: '',
      })
      carregarInsumos()
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Não foi possível registrar o movimento',
        variant: 'destructive',
      })
    }
  }

  const insumosEstoqueBaixo = insumos.filter((i) => i.estoqueBaixo).length
  const valorTotalEstoque = insumos.reduce(
    (acc, i) => acc + i.quantidade * i.precoUnitario,
    0
  )
  const totalInsumos = insumos.length

  const totalPages = Math.ceil(filteredInsumos.length / itemsPerPage)
  const paginatedInsumos = filteredInsumos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Package className="w-8 h-8 text-emerald-600" />
            Gestão de Insumos
          </h1>
          <p className="text-gray-500 mt-1">
            Controle o estoque de insumos agrícolas
          </p>
        </div>
        <Button
          onClick={() => handleOpenDialog()}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Insumo
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-emerald-100 rounded-full">
              <Package className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total de Insumos</p>
              <p className="text-2xl font-bold">{totalInsumos}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-amber-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Estoque Baixo</p>
              <p className="text-2xl font-bold text-amber-600">{insumosEstoqueBaixo}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Valor em Estoque</p>
              <p className="text-2xl font-bold">
                {valorTotalEstoque.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <ClipboardList className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Movimentações</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMovimentoDialogOpen(true)}
                className="text-purple-600 hover:text-purple-700"
              >
                Registrar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar insumo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterTipo} onValueChange={setFilterTipo}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os tipos</SelectItem>
                {TIPOS_INSUMO.map((tipo) => (
                  <SelectItem key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="normal">Estoque normal</SelectItem>
                <SelectItem value="baixo">Estoque baixo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
          ) : filteredInsumos.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>Nenhum insumo encontrado</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Preço Unit.</TableHead>
                    <TableHead>Valor Total</TableHead>
                    <TableHead>Validade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedInsumos.map((insumo) => (
                    <TableRow key={insumo.id}>
                      <TableCell className="font-medium">{insumo.nome}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{insumo.tipo}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{insumo.quantidade.toFixed(2)} {insumo.unidade}</span>
                          {insumo.estoqueBaixo && (
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {insumo.precoUnitario.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </TableCell>
                      <TableCell className="font-medium">
                        {(insumo.quantidade * insumo.precoUnitario).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </TableCell>
                      <TableCell>
                        {insumo.dataValidade ? (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(insumo.dataValidade + 'T00:00:00').toLocaleDateString('pt-BR')}
                          </div>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>
                        {insumo.estoqueBaixo ? (
                          <Badge variant="destructive" className="text-xs">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Baixo
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700">
                            Normal
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedInsumo(insumo)
                              setMovimentoData({
                                tipo: 'ENTRADA',
                                quantidade: 0,
                                motivo: '',
                                responsavel: '',
                              })
                              setIsMovimentoDialogOpen(true)
                            }}
                          >
                            <TrendingUp className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenDialog(insumo)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedInsumo(insumo)
                              setIsDeleteDialogOpen(true)
                            }}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t">
              <p className="text-sm text-gray-500">
                Mostrando {(currentPage - 1) * itemsPerPage + 1} a{' '}
                {Math.min(currentPage * itemsPerPage, filteredInsumos.length)} de{' '}
                {filteredInsumos.length} insumos
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog Novo/Editar Insumo */}
      <Dialog open={isDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
        setIsDialogOpen(open)
        setIsEditDialogOpen(open)
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedInsumo ? 'Editar Insumo' : 'Novo Insumo'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="nome">Nome do Insumo</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                  placeholder="Ex: Ureia Agrícola"
                />
              </div>
              <div>
                <Label htmlFor="tipo">Tipo</Label>
                <Select
                  value={formData.tipo}
                  onValueChange={(value) =>
                    setFormData({ ...formData, tipo: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIPOS_INSUMO.map((tipo) => (
                      <SelectItem key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="unidade">Unidade</Label>
                <Select
                  value={formData.unidade}
                  onValueChange={(value) =>
                    setFormData({ ...formData, unidade: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {UNIDADES.map((unidade) => (
                      <SelectItem key={unidade.value} value={unidade.value}>
                        {unidade.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="quantidade">Quantidade Inicial</Label>
                <Input
                  id="quantidade"
                  type="number"
                  value={formData.quantidade}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantidade: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="estoqueMinimo">Estoque Mínimo</Label>
                <Input
                  id="estoqueMinimo"
                  type="number"
                  value={formData.estoqueMinimo}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      estoqueMinimo: parseFloat(e.target.value) || 10,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="precoUnitario">Preço Unitário</Label>
                <Input
                  id="precoUnitario"
                  type="number"
                  step="0.01"
                  value={formData.precoUnitario}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      precoUnitario: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="dataValidade">Data de Validade</Label>
                <Input
                  id="dataValidade"
                  type="date"
                  value={formData.dataValidade}
                  onChange={(e) =>
                    setFormData({ ...formData, dataValidade: e.target.value })
                  }
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="fornecedor">Fornecedor</Label>
                <Input
                  id="fornecedor"
                  value={formData.fornecedor}
                  onChange={(e) =>
                    setFormData({ ...formData, fornecedor: e.target.value })
                  }
                  placeholder="Nome do fornecedor"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsDialogOpen(false)
                setIsEditDialogOpen(false)
              }}
            >
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700">
              {selectedInsumo ? 'Salvar Alterações' : 'Cadastrar'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog Movimentação */}
      <Dialog open={isMovimentoDialogOpen} onOpenChange={setIsMovimentoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Registrar Movimentação de Estoque
            </DialogTitle>
          </DialogHeader>
          {selectedInsumo && (
            <div className="space-y-4 py-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Insumo</p>
                <p className="font-medium">{selectedInsumo.nome}</p>
                <p className="text-sm text-gray-500 mt-2">Estoque Atual</p>
                <p className="text-lg font-bold text-emerald-600">
                  {selectedInsumo.quantidade.toFixed(2)} {selectedInsumo.unidade}
                </p>
              </div>
              <div>
                <Label>Tipo de Movimentação</Label>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant={movimentoData.tipo === 'ENTRADA' ? 'default' : 'outline'}
                    className={movimentoData.tipo === 'ENTRADA' ? 'bg-emerald-600' : ''}
                    onClick={() =>
                      setMovimentoData({ ...movimentoData, tipo: 'ENTRADA' })
                    }
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Entrada
                  </Button>
                  <Button
                    variant={movimentoData.tipo === 'SAIDA' ? 'default' : 'outline'}
                    className={movimentoData.tipo === 'SAIDA' ? 'bg-amber-600' : ''}
                    onClick={() =>
                      setMovimentoData({ ...movimentoData, tipo: 'SAIDA' })
                    }
                  >
                    <TrendingDown className="w-4 h-4 mr-2" />
                    Saída
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="quantidadeMov">Quantidade</Label>
                <Input
                  id="quantidadeMov"
                  type="number"
                  value={movimentoData.quantidade}
                  onChange={(e) =>
                    setMovimentoData({
                      ...movimentoData,
                      quantidade: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="motivo">Motivo</Label>
                <Input
                  id="motivo"
                  value={movimentoData.motivo}
                  onChange={(e) =>
                    setMovimentoData({ ...movimentoData, motivo: e.target.value })
                  }
                  placeholder={movimentoData.tipo === 'ENTRADA' ? 'Ex: Compra de insumo' : 'Ex: Aplicação na cultura'}
                />
              </div>
              <div>
                <Label htmlFor="responsavel">Responsável</Label>
                <Input
                  id="responsavel"
                  value={movimentoData.responsavel}
                  onChange={(e) =>
                    setMovimentoData({ ...movimentoData, responsavel: e.target.value })
                  }
                  placeholder="Nome do responsável"
                />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsMovimentoDialogOpen(false)
                setMovimentoData({
                  tipo: 'ENTRADA',
                  quantidade: 0,
                  motivo: '',
                  responsavel: '',
                })
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleRegistrarMovimento}
              className={movimentoData.tipo === 'ENTRADA' ? 'bg-emerald-600' : 'bg-amber-600'}
            >
              Registrar {movimentoData.tipo === 'ENTRADA' ? 'Entrada' : 'Saída'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog Confirmação Exclusão */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Insumo</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o insumo &quot;{selectedInsumo?.nome}&quot;? Esta ação
              não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
