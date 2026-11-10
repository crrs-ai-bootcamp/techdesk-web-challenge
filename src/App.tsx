import React, { useState, useEffect } from 'react';

// ============================================================================
// PROP DRILLING LEVEL 4 - Ações Finais e Comentários do Modal
// ============================================================================
function TicketModalActionsSection(props: any) {
  return (
    <div
      className="border-t pt-4"
      style={{ marginTop: '22px', backgroundColor: '#fafafa', padding: '14px', borderRadius: '4px' }}
    >
      <h4 className="font-bold text-gray-800" style={{ fontSize: '15px', marginBottom: '10px', color: '#1e293b' }}>
        Ações Rápidas de Atendimento (Agente: {props.loggedAgentName})
      </h4>

      <div className="flex gap-2 flex-wrap" style={{ marginBottom: '18px' }}>
        <button
          onClick={() => {
            props.onChangeTicketStatus(props.selectedTicketData.id, 'OPEN');
            props.setLastActionLog('Status alterado para OPEN no ticket #' + props.selectedTicketData.id);
          }}
          className="px-3 py-1 rounded text-white text-xs"
          style={{ backgroundColor: '#dc2626', border: '1px solid black', cursor: 'pointer' }}
        >
          Marcar Aberto
        </button>

        <button
          onClick={() => {
            props.onChangeTicketStatus(props.selectedTicketData.id, 'IN_PROGRESS');
            props.setLastActionLog('Status alterado para IN_PROGRESS no ticket #' + props.selectedTicketData.id);
          }}
          className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded"
          style={{ fontSize: '12px', marginLeft: '5px' }}
        >
          Em Andamento
        </button>

        <button
          onClick={() => {
            props.onChangeTicketStatus(props.selectedTicketData.id, 'RESOLVED');
            props.setLastActionLog('Status alterado para RESOLVED no ticket #' + props.selectedTicketData.id);
          }}
          className="bg-emerald-600 text-white px-3 py-1"
          style={{ borderRadius: '10px', fontWeight: 'bold', fontSize: '12px' }}
        >
          Resolver Ticket
        </button>

        <button
          onClick={() => {
            props.onChangeTicketPriority(
              props.selectedTicketData.id,
              props.selectedTicketData.priority === 'CRITICA' ? 'BAIXA' : 'CRITICA'
            );
            props.setLastActionLog('Prioridade invertida no ticket #' + props.selectedTicketData.id);
          }}
          className="underline text-xs"
          style={{ color: 'red', marginLeft: '12px', background: 'transparent' }}
        >
          Alternar Prioridade Crítica/Baixa
        </button>

        <button
          onClick={() => {
            props.onDeleteTicket(props.selectedTicketData.id);
          }}
          className="ml-auto bg-red-800 text-white px-2 py-1 rounded"
          style={{ fontSize: '11px', border: '2px dashed yellow' }}
        >
          Excluir Chamado Permanentemente
        </button>
      </div>

      <div style={{ marginTop: '15px', borderTop: '1px dotted #ccc', paddingTop: '12px' }}>
        <p className="text-xs font-semibold uppercase" style={{ color: '#555', marginBottom: '8px' }}>
          Histórico de Comentários da API ({props.ticketCommentsList ? props.ticketCommentsList.length : 0})
        </p>

        <div className="space-y-2" style={{ maxHeight: '160px', overflowY: 'scroll', paddingRight: '6px' }}>
          {props.ticketCommentsList &&
            props.ticketCommentsList.map((c: Record<string, any>, idx: any) => (
              <div
                key={idx}
                className="p-2 bg-white shadow-sm"
                style={{ borderLeft: '4px solid #3b82f6', marginBottom: '6px', fontSize: '12px' }}
              >
                <div className="font-bold" style={{ color: '#0f172a' }}>
                  {c.email} <span style={{ color: 'gray', fontWeight: 'normal' }}>({c.name})</span>
                </div>
                <div className="text-gray-600" style={{ marginTop: '4px' }}>
                  {c.body}
                </div>
              </div>
            ))}
        </div>

        <div className="flex mt-3" style={{ gap: '8px', marginTop: '15px' }}>
          <input
            type="text"
            value={props.draftCommentText}
            onChange={(e: any) => props.setDraftCommentText(e.target.value)}
            placeholder="Adicionar nota interna no ticket..."
            className="border p-2 flex-1 rounded text-sm"
            style={{ borderColor: '#94a3b8', backgroundColor: '#fff' }}
          />
          <button
            onClick={() => props.onAddInternalComment(props.selectedTicketData.id)}
            className="bg-blue-600 text-white px-4 rounded"
            style={{ fontWeight: 600, fontSize: '13px' }}
          >
            Enviar
          </button>
        </div>
      </div>

      <div className="flex justify-end" style={{ marginTop: '20px' }}>
        <button
          onClick={() => props.setIsModalOpen(false)}
          className="bg-gray-700 text-white px-5 py-2 rounded"
          style={{ cursor: 'pointer', fontSize: '14px' }}
        >
          Fechar Modal
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// PROP DRILLING LEVEL 3 - Corpo Interno do Modal
// ============================================================================
function TicketModalBody(props: Record<string, any>) {
  return (
    <div className="p-4" style={{ backgroundColor: '#ffffff', color: '#222' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '12px' }}>
        <span
          className="px-2 py-1 rounded text-xs font-bold"
          style={{
            backgroundColor: props.selectedTicketData.priority === 'CRITICA' ? '#fee2e2' : '#e0f2fe',
            color: props.selectedTicketData.priority === 'CRITICA' ? 'red' : '#0369a1',
          }}
        >
          Prioridade: {props.selectedTicketData.priority}
        </span>

        <span className="text-xs text-gray-500" style={{ fontStyle: 'italic' }}>
          Solicitante ID #{props.selectedTicketData.userId} -{' '}
          {props.usersMapData[props.selectedTicketData.userId]
            ? props.usersMapData[props.selectedTicketData.userId].name
            : 'Usuário Desconhecido'}
        </span>
      </div>

      <h3 className="text-lg font-bold capitalize" style={{ marginTop: '5px', marginBottom: '10px', color: '#111827' }}>
        #{props.selectedTicketData.id} - {props.selectedTicketData.title}
      </h3>

      <p
        className="text-sm text-gray-700 leading-relaxed"
        style={{
          padding: '12px',
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
        }}
      >
        {props.selectedTicketData.body}
      </p>

      {/* Repassando tudo adiante para o nível 4 */}
      <TicketModalActionsSection
        selectedTicketData={props.selectedTicketData}
        setSelectedTicketData={props.setSelectedTicketData}
        setIsModalOpen={props.setIsModalOpen}
        onChangeTicketStatus={props.onChangeTicketStatus}
        onChangeTicketPriority={props.onChangeTicketPriority}
        onDeleteTicket={props.onDeleteTicket}
        ticketCommentsList={props.ticketCommentsList}
        draftCommentText={props.draftCommentText}
        setDraftCommentText={props.setDraftCommentText}
        onAddInternalComment={props.onAddInternalComment}
        loggedAgentName={props.loggedAgentName}
        setLastActionLog={props.setLastActionLog}
      />
    </div>
  );
}

// ============================================================================
// PROP DRILLING LEVEL 2 - Caixa de Diálogo do Modal
// ============================================================================
function TicketModalDialog(props: any) {
  return (
    <div
      className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden"
      style={{ border: '3px solid #1e40af', marginTop: '25px' }}
    >
      <div
        className="bg-blue-900 text-white px-4 py-3 flex justify-between items-center"
        style={{ borderBottom: '2px solid orange' }}
      >
        <span className="font-bold tracking-wide" style={{ fontSize: '16px' }}>
          Detalhes do Chamado Técnico ({props.selectedTicketData?.status})
        </span>
        <button
          onClick={() => props.setIsModalOpen(false)}
          className="text-white font-bold"
          style={{ fontSize: '20px', color: '#fca5a5' }}
        >
          ✕
        </button>
      </div>

      {/* Repassando as mesmas props para o nível 3 */}
      <TicketModalBody
        selectedTicketData={props.selectedTicketData}
        setSelectedTicketData={props.setSelectedTicketData}
        setIsModalOpen={props.setIsModalOpen}
        onChangeTicketStatus={props.onChangeTicketStatus}
        onChangeTicketPriority={props.onChangeTicketPriority}
        onDeleteTicket={props.onDeleteTicket}
        ticketCommentsList={props.ticketCommentsList}
        draftCommentText={props.draftCommentText}
        setDraftCommentText={props.setDraftCommentText}
        onAddInternalComment={props.onAddInternalComment}
        usersMapData={props.usersMapData}
        loggedAgentName={props.loggedAgentName}
        setLastActionLog={props.setLastActionLog}
      />
    </div>
  );
}

// ============================================================================
// PROP DRILLING LEVEL 1 - Overlay do Modal
// ============================================================================
function TicketModalOverlay(props: Record<string, any>) {
  if (!props.isModalOpen || !props.selectedTicketData) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.72)', padding: '20px' }}
    >
      {/* Repassando as mesmas props para o nível 2 */}
      <TicketModalDialog
        selectedTicketData={props.selectedTicketData}
        setSelectedTicketData={props.setSelectedTicketData}
        setIsModalOpen={props.setIsModalOpen}
        onChangeTicketStatus={props.onChangeTicketStatus}
        onChangeTicketPriority={props.onChangeTicketPriority}
        onDeleteTicket={props.onDeleteTicket}
        ticketCommentsList={props.ticketCommentsList}
        draftCommentText={props.draftCommentText}
        setDraftCommentText={props.setDraftCommentText}
        onAddInternalComment={props.onAddInternalComment}
        usersMapData={props.usersMapData}
        loggedAgentName={props.loggedAgentName}
        setLastActionLog={props.setLastActionLog}
      />
    </div>
  );
}

// ============================================================================
// GOD COMPONENT PRINCIPAL - App.tsx
// ============================================================================
export default function App() {
  // Estados com tipagem fraca (any / Record<string, any>)
  const [tickets, setTickets] = useState<any>([]);
  const [usersMap, setUsersMap] = useState<Record<string, any>>({});
  const [searchQuery, setSearchQuery] = useState<any>('');
  const [statusFilter, setStatusFilter] = useState<any>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<any>('ALL');
  const [sortByOrder, setSortByOrder] = useState<any>('ID_ASC');
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [itemsPerPage, setItemsPerPage] = useState<any>(8);

  // Estados do modal e detalhes do ticket
  const [isModalOpen, setIsModalOpen] = useState<any>(false);
  const [selectedTicket, setSelectedTicket] = useState<Record<string, any> | null>(null);
  const [ticketComments, setTicketComments] = useState<any[]>([]);
  const [draftComment, setDraftComment] = useState<any>('');

  // Estados de criação rápida de ticket no próprio God Component
  const [newTicketTitle, setNewTicketTitle] = useState<any>('');
  const [newTicketBody, setNewTicketBody] = useState<any>('');
  const [newTicketPriority, setNewTicketPriority] = useState<any>('ALTA');
  const [showNewTicketForm, setShowNewTicketForm] = useState<any>(false);

  // Outros estados soltos
  const [loggedAgent, setLoggedAgent] = useState<any>('Carlos (Nível 2)');
  const [lastActionLog, setLastActionLog] = useState<any>('Nenhuma ação registrada ainda.');

  // REGRA 3: Efeitos Colaterais sem loading, sem catch(error) e sem cleanup
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res: any) => res.json())
      .then((data: any) => {
        const mapped: any = data.map((item: Record<string, any>, index: any) => {
          let st = 'OPEN';
          if (index % 3 === 0) st = 'IN_PROGRESS';
          if (index % 5 === 0) st = 'RESOLVED';

          let prio = 'MEDIA';
          if (item.id % 4 === 0) prio = 'CRITICA';
          else if (item.id % 2 === 0) prio = 'ALTA';
          else prio = 'BAIXA';

          return {
            ...item,
            status: st,
            priority: prio,
            slaHours: (item.id * 3) % 24 || 2,
          };
        });
        setTickets(mapped);
      });

    fetch('https://jsonplaceholder.typicode.com/users')
      .then((r: any) => r.json())
      .then((uData: any) => {
        const acc: Record<string, any> = {};
        uData.forEach((u: any) => {
          acc[u.id] = u;
        });
        setUsersMap(acc);
      });
  }, []);

  // Outro useEffect solto sem catch e sem cleanup para buscar comentários quando abre um ticket
  useEffect(() => {
    if (selectedTicket && selectedTicket.id) {
      fetch('https://jsonplaceholder.typicode.com/posts/' + selectedTicket.id + '/comments')
        .then((res: any) => res.json())
        .then((commentsData: any) => {
          setTicketComments(commentsData);
        });
    }
  }, [selectedTicket]);

  // Funções de mutação espalhadas no componente principal
  const handleChangeTicketStatus = (ticketId: any, newStatus: any) => {
    const updated = tickets.map((t: Record<string, any>) => {
      if (t.id === ticketId) {
        return { ...t, status: newStatus };
      }
      return t;
    });
    setTickets(updated);

    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, status: newStatus });
    }
  };

  const handleChangeTicketPriority = (ticketId: any, newPriority: any) => {
    const updated = tickets.map((t: any) => {
      if (t.id === ticketId) {
        return { ...t, priority: newPriority };
      }
      return t;
    });
    setTickets(updated);

    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, priority: newPriority });
    }
  };

  const handleDeleteTicket = (ticketId: any) => {
    fetch('https://jsonplaceholder.typicode.com/posts/' + ticketId, {
      method: 'DELETE',
    }).then(() => {
      setTickets(tickets.filter((t: any) => t.id !== ticketId));
      setIsModalOpen(false);
      setSelectedTicket(null);
      setLastActionLog('Ticket #' + ticketId + ' removido com sucesso.');
    });
  };

  const handleAddInternalComment = (ticketId: any) => {
    if (!draftComment) return;
    fetch('https://jsonplaceholder.typicode.com/posts/' + ticketId + '/comments', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({
        name: 'Nota Interna - ' + loggedAgent,
        email: 'suporte@techdesk.internal',
        body: draftComment,
      }),
    })
      .then((r: any) => r.json())
      .then((created: Record<string, any>) => {
        setTicketComments([...ticketComments, created]);
        setDraftComment('');
        setLastActionLog('Comentário adicionado no ticket #' + ticketId);
      });
  };

  const handleCreateTicket = (e: any) => {
    e.preventDefault();
    if (!newTicketTitle || !newTicketBody) {
      alert('Preencha título e descrição!');
      return;
    }

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({
        title: newTicketTitle,
        body: newTicketBody,
        userId: 1,
      }),
    })
      .then((res: any) => res.json())
      .then((data: any) => {
        const fakeNewTicket: Record<string, any> = {
          ...data,
          id: tickets.length + 101,
          status: 'OPEN',
          priority: newTicketPriority,
          slaHours: 4,
        };
        setTickets([fakeNewTicket, ...tickets]);
        setNewTicketTitle('');
        setNewTicketBody('');
        setShowNewTicketForm(false);
        setLastActionLog('Novo ticket #' + fakeNewTicket.id + ' criado!');
      });
  };

  // Lógica de filtragem, busca, ordenação e paginação acoplada diretamente na renderização
  let filteredTickets: any[] = tickets.filter((item: Record<string, any>) => {
    const matchesText =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(item.id).includes(searchQuery);

    const matchesStatus = statusFilter === 'ALL' ? true : item.status === statusFilter;
    const matchesPrio = priorityFilter === 'ALL' ? true : item.priority === priorityFilter;

    return matchesText && matchesStatus && matchesPrio;
  });

  if (sortByOrder === 'ID_ASC') {
    filteredTickets.sort((a: any, b: any) => a.id - b.id);
  } else if (sortByOrder === 'ID_DESC') {
    filteredTickets.sort((a: any, b: any) => b.id - a.id);
  } else if (sortByOrder === 'TITLE_ASC') {
    filteredTickets.sort((a: any, b: any) => a.title.localeCompare(b.title));
  }

  const totalPages: any = Math.ceil(filteredTickets.length / itemsPerPage) || 1;
  const startIndex: any = (currentPage - 1) * itemsPerPage;
  const paginatedTickets: any[] = filteredTickets.slice(startIndex, startIndex + itemsPerPage);

  // Contadores calculados toda vez no meio do render
  const openCount: any = tickets.filter((t: any) => t.status === 'OPEN').length;
  const progressCount: any = tickets.filter((t: any) => t.status === 'IN_PROGRESS').length;
  const resolvedCount: any = tickets.filter((t: any) => t.status === 'RESOLVED').length;
  const criticalCount: any = tickets.filter((t: any) => t.priority === 'CRITICA').length;

  return (
    <div className="min-h-screen bg-slate-100" style={{ fontFamily: 'Arial, sans-serif', paddingBottom: '60px' }}>
      {/* HEADER CAÓTICO */}
      <header
        className="bg-slate-900 text-white shadow-md"
        style={{ padding: '18px 32px', borderBottom: '4px solid #2563eb' }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: '#60a5fa', margin: 0 }}>
              🛠 TechDesk Web{' '}
              <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded" style={{ marginLeft: '10px' }}>
                v0.1-LEGACY
              </span>
            </h1>
            <p className="text-xs text-slate-400" style={{ marginTop: '6px' }}>
              Central de Controle de Chamados e Incidentes (JSONPlaceholder Sandbox)
            </p>
          </div>

          <div className="flex items-center gap-4" style={{ marginTop: '8px' }}>
            <div style={{ textAlign: 'right', marginRight: '10px' }}>
              <span className="text-xs block text-slate-300">Operador Logado:</span>
              <input
                type="text"
                value={loggedAgent}
                onChange={(e: any) => setLoggedAgent(e.target.value)}
                className="text-black px-2 py-0.5 rounded text-xs"
                style={{ border: '2px solid #38bdf8', width: '150px' }}
              />
            </div>

            <button
              onClick={() => setShowNewTicketForm(!showNewTicketForm)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-bold text-sm"
              style={{ boxShadow: '0 4px 0 #1d4ed8', cursor: 'pointer' }}
            >
              {showNewTicketForm ? 'Cancelar Abertura' : '+ Abrir Novo Ticket'}
            </button>
          </div>
        </div>
      </header>

      {/* BARRA DE LOG DE ULTIMA AÇÃO */}
      <div
        className="bg-yellow-100 border-b border-yellow-300 text-center"
        style={{ padding: '6px 15px', fontSize: '12px', color: '#854d0e' }}
      >
        <strong>Log do Sistema:</strong> {lastActionLog}
      </div>

      <main className="max-w-7xl mx-auto px-4" style={{ marginTop: '20px' }}>
        {/* CARDS DE RESUMO */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4" style={{ marginBottom: '25px' }}>
          <div
            className="bg-white p-4 rounded shadow"
            style={{ borderLeft: '6px solid #ef4444', padding: '16px' }}
          >
            <span className="text-xs uppercase font-bold text-gray-500">Tickets Abertos</span>
            <div className="text-3xl font-black" style={{ color: 'red', marginTop: '5px' }}>
              {openCount}
            </div>
          </div>

          <div
            className="bg-white p-4 rounded shadow"
            style={{ borderLeft: '6px solid #f59e0b', padding: '16px' }}
          >
            <span className="text-xs uppercase font-bold text-gray-500">Em Atendimento</span>
            <div className="text-3xl font-black text-amber-600" style={{ marginTop: '5px' }}>
              {progressCount}
            </div>
          </div>

          <div
            className="bg-white p-4 rounded shadow"
            style={{ borderLeft: '6px solid #10b981', padding: '16px' }}
          >
            <span className="text-xs uppercase font-bold text-gray-500">Resolvidos</span>
            <div className="text-3xl font-black text-emerald-600" style={{ marginTop: '5px' }}>
              {resolvedCount}
            </div>
          </div>

          <div
            className="bg-white p-4 rounded shadow"
            style={{ borderLeft: '6px solid #7c3aed', backgroundColor: '#faf5ff', padding: '16px' }}
          >
            <span className="text-xs uppercase font-bold" style={{ color: '#6d28d9' }}>
              Prioridade Crítica
            </span>
            <div className="text-3xl font-black" style={{ color: '#5b21b6', marginTop: '5px' }}>
              {criticalCount}
            </div>
          </div>
        </div>

        {/* FORMULÁRIO DE NOVO TICKET EMBUTIDO NO GOD COMPONENT */}
        {showNewTicketForm && (
          <form
            onSubmit={handleCreateTicket}
            className="bg-white p-5 rounded-lg shadow-md"
            style={{ marginBottom: '25px', border: '2px solid #2563eb', backgroundColor: '#eff6ff' }}
          >
            <h2 className="text-lg font-bold" style={{ marginBottom: '12px', color: '#1e3a8a' }}>
              Registrar Novo Chamado no Sistema
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ marginBottom: '12px' }}>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase mb-1" style={{ color: '#334155' }}>
                  Título do Problema
                </label>
                <input
                  type="text"
                  value={newTicketTitle}
                  onChange={(e: any) => setNewTicketTitle(e.target.value)}
                  placeholder="Ex: Servidor de autenticação fora do ar..."
                  className="w-full p-2 border rounded"
                  style={{ borderColor: '#93c5fd' }}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1" style={{ color: '#334155' }}>
                  Prioridade Inicial
                </label>
                <select
                  value={newTicketPriority}
                  onChange={(e: any) => setNewTicketPriority(e.target.value)}
                  className="w-full p-2 border rounded bg-white"
                  style={{ borderColor: '#93c5fd', height: '42px' }}
                >
                  <option value="BAIXA">BAIXA</option>
                  <option value="MEDIA">MEDIA</option>
                  <option value="ALTA">ALTA</option>
                  <option value="CRITICA">CRITICA</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label className="block text-xs font-bold uppercase mb-1" style={{ color: '#334155' }}>
                Descrição Detalhada
              </label>
              <textarea
                rows={3}
                value={newTicketBody}
                onChange={(e: any) => setNewTicketBody(e.target.value)}
                placeholder="Descreva os passos para reproduzir o erro..."
                className="w-full p-2 border rounded"
                style={{ borderColor: '#93c5fd' }}
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-5 py-2 rounded font-bold"
              style={{ cursor: 'pointer', fontSize: '14px' }}
            >
              Salvar Chamado
            </button>
          </form>
        )}

        {/* BARRA DE FILTROS E BUSCA */}
        <div
          className="bg-white p-4 rounded shadow flex flex-wrap gap-4 items-end justify-between"
          style={{ marginBottom: '20px', border: '1px solid #cbd5e1' }}
        >
          <div style={{ flex: '1 1 260px' }}>
            <label className="block text-xs font-bold text-gray-600" style={{ marginBottom: '4px' }}>
              Buscar por ID, Título ou Conteúdo:
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e: any) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Digite termo de busca..."
              className="w-full border px-3 py-2 rounded text-sm"
              style={{ borderColor: '#64748b' }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600" style={{ marginBottom: '4px' }}>
              Filtrar Status:
            </label>
            <select
              value={statusFilter}
              onChange={(e: any) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border px-3 py-2 rounded text-sm bg-white"
              style={{ minWidth: '140px' }}
            >
              <option value="ALL">Todos os Status</option>
              <option value="OPEN">Abertos (OPEN)</option>
              <option value="IN_PROGRESS">Em Andamento</option>
              <option value="RESOLVED">Resolvidos</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600" style={{ marginBottom: '4px' }}>
              Filtrar Prioridade:
            </label>
            <select
              value={priorityFilter}
              onChange={(e: any) => {
                setPriorityFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border px-3 py-2 rounded text-sm bg-white"
              style={{ minWidth: '140px' }}
            >
              <option value="ALL">Todas</option>
              <option value="CRITICA">Crítica</option>
              <option value="ALTA">Alta</option>
              <option value="MEDIA">Média</option>
              <option value="BAIXA">Baixa</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600" style={{ marginBottom: '4px' }}>
              Ordenação:
            </label>
            <select
              value={sortByOrder}
              onChange={(e: any) => setSortByOrder(e.target.value)}
              className="border px-3 py-2 rounded text-sm bg-white"
            >
              <option value="ID_ASC">ID Crescente</option>
              <option value="ID_DESC">ID Decrescente</option>
              <option value="TITLE_ASC">Título (A-Z)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600" style={{ marginBottom: '4px' }}>
              Itens/Página:
            </label>
            <select
              value={itemsPerPage}
              onChange={(e: any) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border px-3 py-2 rounded text-sm bg-white"
            >
              <option value={5}>5 por pág.</option>
              <option value={8}>8 por pág.</option>
              <option value={15}>15 por pág.</option>
              <option value={25}>25 por pág.</option>
            </select>
          </div>
        </div>

        {/* LISTAGEM DE TICKETS */}
        <div className="bg-white rounded shadow overflow-hidden" style={{ border: '1px solid #d1d5db' }}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800 text-white text-xs uppercase" style={{ height: '42px' }}>
                <th className="p-3">ID</th>
                <th className="p-3">Assunto do Chamado</th>
                <th className="p-3">Cliente</th>
                <th className="p-3">Prioridade</th>
                <th className="p-3">Status</th>
                <th className="p-3">SLA</th>
                <th className="p-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTickets.map((ticket: Record<string, any>, i: any) => (
                <tr
                  key={ticket.id}
                  className="border-b hover:bg-slate-50"
                  style={{
                    backgroundColor: i % 2 === 0 ? '#ffffff' : '#f8fafc',
                    height: '58px',
                  }}
                >
                  <td className="p-3 font-mono font-bold text-sm" style={{ color: '#475569' }}>
                    #{ticket.id}
                  </td>

                  <td className="p-3" style={{ maxWidth: '340px' }}>
                    <div
                      className="font-semibold text-sm truncate"
                      style={{ color: '#0f172a', marginBottom: '2px' }}
                    >
                      {ticket.title}
                    </div>
                    <div className="text-xs text-gray-500 truncate">{ticket.body}</div>
                  </td>

                  <td className="p-3 text-xs" style={{ color: '#334155' }}>
                    {usersMap[ticket.userId] ? usersMap[ticket.userId].name : 'Carregando cliente...'}
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>
                      {usersMap[ticket.userId] ? usersMap[ticket.userId].company?.name : ''}
                    </div>
                  </td>

                  <td className="p-3">
                    <span
                      className="px-2 py-0.5 rounded text-xs font-bold"
                      style={{
                        backgroundColor:
                          ticket.priority === 'CRITICA'
                            ? '#fee2e2'
                            : ticket.priority === 'ALTA'
                            ? '#ffedd5'
                            : '#f1f5f9',
                        color:
                          ticket.priority === 'CRITICA'
                            ? 'red'
                            : ticket.priority === 'ALTA'
                            ? '#c2410c'
                            : '#475569',
                      }}
                    >
                      {ticket.priority}
                    </span>
                  </td>

                  <td className="p-3">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor:
                          ticket.status === 'OPEN'
                            ? '#fef2f2'
                            : ticket.status === 'IN_PROGRESS'
                            ? '#fffbeb'
                            : '#ecfdf5',
                        color:
                          ticket.status === 'OPEN'
                            ? '#dc2626'
                            : ticket.status === 'IN_PROGRESS'
                            ? '#d97706'
                            : '#059669',
                        border: '1px solid currentColor',
                      }}
                    >
                      {ticket.status}
                    </span>
                  </td>

                  <td className="p-3 text-xs font-mono" style={{ color: ticket.slaHours <= 4 ? 'red' : '#64748b' }}>
                    {ticket.slaHours}h
                  </td>

                  <td className="p-3 text-right">
                    <button
                      onClick={() => {
                        setSelectedTicket(ticket);
                        setIsModalOpen(true);
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-xs"
                      style={{ marginRight: '6px', cursor: 'pointer' }}
                    >
                      Ver Detalhes
                    </button>

                    <button
                      onClick={() =>
                        handleChangeTicketStatus(
                          ticket.id,
                          ticket.status === 'RESOLVED' ? 'OPEN' : 'RESOLVED'
                        )
                      }
                      className="border px-2 py-1 rounded text-xs"
                      style={{
                        backgroundColor: '#f1f5f9',
                        color: '#0f172a',
                        borderColor: '#94a3b8',
                      }}
                    >
                      {ticket.status === 'RESOLVED' ? 'Reabrir' : 'Concluir'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CONTROLES DE PAGINAÇÃO */}
        <div
          className="flex justify-between items-center bg-white p-4 rounded shadow"
          style={{ marginTop: '15px', border: '1px solid #e2e8f0' }}
        >
          <span className="text-xs text-gray-600" style={{ fontWeight: 'bold' }}>
            Exibindo {paginatedTickets.length} de {filteredTickets.length} tickets filtrados (Total bruto:{' '}
            {tickets.length})
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(1)}
              className="px-2 py-1 border rounded text-xs disabled:opacity-40"
              style={{ backgroundColor: '#f8fafc' }}
            >
              {'<<'}
            </button>

            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-3 py-1 border rounded text-xs disabled:opacity-40"
              style={{ backgroundColor: '#f8fafc', fontWeight: 'bold' }}
            >
              Anterior
            </button>

            <span className="text-xs px-3" style={{ color: '#1e293b' }}>
              Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
            </span>

            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-1 border rounded text-xs disabled:opacity-40"
              style={{ backgroundColor: '#f8fafc', fontWeight: 'bold' }}
            >
              Próxima
            </button>

            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(totalPages)}
              className="px-2 py-1 border rounded text-xs disabled:opacity-40"
              style={{ backgroundColor: '#f8fafc' }}
            >
              {'>>'}
            </button>
          </div>
        </div>
      </main>

      {/* CHAMADA DO MODAL INICIANDO OS 4 NÍVEIS DE PROP DRILLING */}
      <TicketModalOverlay
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedTicketData={selectedTicket}
        setSelectedTicketData={setSelectedTicket}
        onChangeTicketStatus={handleChangeTicketStatus}
        onChangeTicketPriority={handleChangeTicketPriority}
        onDeleteTicket={handleDeleteTicket}
        ticketCommentsList={ticketComments}
        draftCommentText={draftComment}
        setDraftCommentText={setDraftComment}
        onAddInternalComment={handleAddInternalComment}
        usersMapData={usersMap}
        loggedAgentName={loggedAgent}
        setLastActionLog={setLastActionLog}
      />
    </div>
  );
}
