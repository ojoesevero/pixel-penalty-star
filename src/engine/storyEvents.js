/* ==========================================================================
   STORY EVENTS & MORAL DILEMMAS
   Authentic Brazilian & International football culture storylines
   ========================================================================== */

export const STORY_EVENTS = [
  {
    id: 'balada_parcas',
    title: '🎉 BALADA NA QUINTA-FEIRA',
    tag: 'Extracampo',
    description:
      'Seus parças de infância chegaram na cidade e organizaram uma festa com funk e pagode. O clássico decisivo é no domingo.',
    options: [
      {
        id: 'opt_sleep',
        label: 'Dizer não e ficar concentrado em casa',
        description: 'Foco total no clássico de domingo. Seu corpo agradece.',
        effects: { energy: 10, coachTrust: 5, fanLove: 0, money: 0 },
        resultText: 'Você recusou o convite com maturidade. O treinador elogiou sua postura e dedicação no treino da manhã seguinte!',
      },
      {
        id: 'opt_peek',
        label: 'Dar apenas uma passada de 1 horinha',
        description: 'Ver os amigos rápido e voltar antes da meia-noite.',
        effects: { energy: -10, coachTrust: 0, fanLove: 5, money: -800 },
        resultText: 'Você deu um abraço na galera e pagou a rodada de refrigerante. Foi tranquilo, mas você acordou um pouco cansado.',
      },
      {
        id: 'opt_party_hard',
        label: 'Curtir a noite toda ("A vida é uma só!")',
        description: 'Camarote, pagode até o amanhecer e pagar a conta do bonde.',
        effects: { energy: -30, coachTrust: -15, fanLove: -10, money: -5000, mediaHype: 15 },
        resultText: 'Vídeos seus dançando no palco vazaram nas redes sociais! A torcida organizada foi cobrar satisfação na porta do CT e o técnico colocou você no banco!',
      },
    ],
  },
  {
    id: 'entrevista_coletiva',
    title: '🎙️ MICROFONE ABERTO NO PÓS-JOGO',
    tag: 'Imprensa',
    description:
      'Na zona mista, repórteres colocam fogo no parquinho: "Você acha que o esquema tático do professor tá engessando o seu futebol?"',
    options: [
      {
        id: 'opt_diplomat',
        label: 'Ser diplomático ("O grupo está focado")',
        description: 'Preservar o ambiente do vestiário e respeitar o comandante.',
        effects: { coachTrust: 10, mediaHype: -5, fanLove: 5 },
        resultText: 'Resposta de veterano! O treinador sentiu total lealdade da sua parte e garantiu sua vaga no time titular.',
      },
      {
        id: 'opt_sincero',
        label: 'Desabafar sinceramente ("Poderíamos atacar mais")',
        description: 'Mostrar ambição e cobrar postura ofensiva da equipe.',
        effects: { coachTrust: -15, mediaHype: 25, fanLove: 15 },
        resultText: 'A declaração virou manchete principal no Globo Esporte! A torcida apoiou sua coragem, mas o clima no vestiário azedou.',
      },
      {
        id: 'opt_silent',
        label: 'Passar direto com fone de ouvido gigante',
        description: 'Evitar polêmicas e ignorar os microfones.',
        effects: { coachTrust: 0, mediaHype: -10, fanLove: -5 },
        resultText: 'Os comentaristas do SporTV te chamaram de mimado ao vivo por ignorar a imprensa, mas você evitou qualquer crise interna.',
      },
    ],
  },
  {
    id: 'empresario_tentador',
    title: '💼 O EMPRESÁRIO COM MALETA PRETA',
    tag: 'Carreira',
    description:
      'Um agente influente surge com uma proposta de patrocínio de R$ 50.000 em dinheiro vivo para você assinar com a agência dele.',
    options: [
      {
        id: 'opt_accept_agent',
        label: 'Aceitar a grana e assinar a procuração',
        description: 'Bônus imediato no bolso para reforçar suas finanças.',
        effects: { money: 50000, mediaHype: 15, coachTrust: -5 },
        resultText: 'Dinheiro na conta! O agente já começou a cavar notas suas na imprensa, embora o clube formador não tenha gostado da jogada.',
      },
      {
        id: 'opt_decline_agent',
        label: 'Recusar ("Minha família gerencia minha carreira")',
        description: 'Manter a independência e controle dos seus passos.',
        effects: { composure: 10, coachTrust: 10 },
        resultText: 'Você manteve os pés no chão. A diretoria do seu clube valorizou a sua lealdade e prometeu conversar sobre valorização.',
      },
    ],
  },
  {
    id: 'torcida_ct',
    title: '📢 PROTESTO DA TORCIDA NO CT',
    tag: 'Torcida',
    description:
      'A torcida organizada cerca o portão do CT com faixas: "QUEREMOS RAÇA!". Os líderes pedem para falar com os atletas.',
    options: [
      {
        id: 'opt_face_crowd',
        label: 'Descer do ônibus e conversar de cabeça erguida',
        description: 'Olhar no olho da torcida e prometer entrega em campo.',
        effects: { fanLove: 20, composure: 10, energy: -5 },
        resultText: 'A torcida respeitou a sua personalidade! Eles aplaudiram sua coragem e puxaram um canto com o seu nome na arquibancada.',
      },
      {
        id: 'opt_stay_inside',
        label: 'Permanecer no ônibus com os seguranças',
        description: 'Segurança em primeiro lugar, sem dar trela para cobrança.',
        effects: { fanLove: -15, composure: -5 },
        resultText: 'A galera começou a bater na lataria do ônibus gritando "Pipoqueiro!". A pressão pro próximo jogo será gigantesca.',
      },
    ],
  },
];

export function getRandomStoryEvent(alreadySeenIds = []) {
  const available = STORY_EVENTS.filter((e) => !alreadySeenIds.includes(e.id));
  if (available.length === 0) {
    return STORY_EVENTS[Math.floor(Math.random() * STORY_EVENTS.length)];
  }
  return available[Math.floor(Math.random() * available.length)];
}
