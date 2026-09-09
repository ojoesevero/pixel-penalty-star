/* ==========================================================================
   STORY EVENTS & MORAL DILEMMAS — "VESTIÁRIO & CRISES"
   52+ Authentic football culture storylines (Brazilian & Global)
   ========================================================================== */

export const STORY_EVENTS = [
  // --- 1 a 10: VESTIÁRIO, EGO & PANELÕES ---
  {
    id: 'disputa_penalti',
    title: '⚽ DISPUTA PELA BOLA NA MARCA DA CAL',
    tag: 'Vestiário',
    description:
      'O juiz marca pênalti no último minuto! Você pega a bola com confiança, mas o camisa 10 veterano do time arranca ela da sua mão gritando que ele é o batedor oficial.',
    options: [
      {
        id: 'opt_give_ball',
        label: 'Respeitar a hierarquia e entregar a bola',
        description: 'Engolir o orgulho e torcer para o veterano converter.',
        effects: { coachTrust: 8, fanLove: -2, composure: 5 },
        resultText: 'O veterano converteu o gol e te deu um abraço na comemoração! O treinador elogiou sua maturidade no vestiário.',
      },
      {
        id: 'opt_argue_take',
        label: 'Bater o pé e cobrar o pênalti ("Eu que sofri!")',
        description: 'Assumir a responsabilidade diante de 40 mil torcedores.',
        effects: { coachTrust: -10, fanLove: 15, mediaHype: 20 },
        resultText: 'Você estufou as redes no ângulo! A torcida foi à loucura, mas o veterano passou reto por você no vestiário sem falar nada.',
      },
      {
        id: 'opt_call_coach',
        label: 'Olhar para o banco e pedir ordem do professor',
        description: 'Deixar o técnico decidir para não criar racha.',
        effects: { coachTrust: 5, fanLove: -5, composure: -2 },
        resultText: 'O técnico gesticulou mandando o veterano bater. O lance esfriou e a torcida chiou com a indecisão.',
      },
    ],
  },
  {
    id: 'racha_titulares_reservas',
    title: '⚔️ O CLIMA PESOU NO RACHÃO',
    tag: 'Vestiário',
    description:
      'No treino de sexta-feira, um volante reserva dá uma entrada criminosa no seu tornozelo e ainda solta: "Levanta que aqui não tem estrela!".',
    options: [
      {
        id: 'opt_brawl',
        label: 'Partir para cima do companheiro ("Turma do deixa disso")',
        description: 'Mostrar que ninguém monta em você no grupo.',
        effects: { coachTrust: -15, composure: -10, mediaHype: 15 },
        resultText: 'O treino parou em confusão generalizada! A imprensa filmou do morro vizinho e o técnico puniu os dois com multa.',
      },
      {
        id: 'opt_cool_head',
        label: 'Levantar em silêncio e responder com gol no lance seguinte',
        description: 'Manter a cabeça fria e responder dentro de campo.',
        effects: { composure: 15, coachTrust: 10, energy: -5 },
        resultText: 'Na jogada seguinte, você aplicou uma caneta humilhante nele e fez o gol! O grupo inteiro aplaudiu sua postura de craque.',
      },
    ],
  },
  {
    id: 'caixa_som_vestiario',
    title: '🔊 A GUERRA DA CAIXA DE SOM JBL',
    tag: 'Vestiário',
    description:
      'Antes da final, o grupo quer tocar funk pesado no talo, mas os atletas evangélicos e o capitão pedem hinos e concentração silenciosa.',
    options: [
      {
        id: 'opt_funk_party',
        label: 'Assumir o Bluetooth e soltar o pancadão para animar a tropa',
        description: 'Energia lá em cima para entrar mordendo em campo!',
        effects: { energy: 10, coachTrust: -5, mediaHype: 10 },
        resultText: 'O vestiário virou uma festa dançante! O time entrou pilhado, embora o capitão tenha ficado de cara amarrada.',
      },
      {
        id: 'opt_respect_silence',
        label: 'Pedir respeito e sugerir que cada um use seus fones de ouvido',
        description: 'Paz no ambiente e respeito às crenças de todos.',
        effects: { coachTrust: 8, composure: 10 },
        resultText: 'Você agiu como um verdadeiro líder conciliador. O clima de respeito mútuo fortaleceu a união do grupo para o jogo.',
      },
    ],
  },
  {
    id: 'gringo_isolado',
    title: '🌎 O GRINGO REFORÇO ISOLADO NO CANTO',
    tag: 'Vestiário',
    description:
      'O clube contratou um atacante sul-americano caro que não fala português e passa os intervalos sozinho no canto do vestiário mexendo no celular.',
    options: [
      {
        id: 'opt_welcome_mate',
        label: 'Sentar ao lado dele, compartilhar chimarrão e puxar papo',
        description: 'Ajudar na adaptação do novo parceiro de ataque.',
        effects: { coachTrust: 10, composure: 8, fanLove: 5 },
        resultText: 'Ele abriu um sorriso sincero e confessou estar com saudades da família. O entrosamento de vocês em campo melhorou 100%!',
      },
      {
        id: 'opt_ignore_gringo',
        label: 'Ficar na sua resenha habitual com os amigos brasileiros',
        description: 'Ele ganha em dólar, que se vire para se entrosar.',
        effects: { coachTrust: -2, mediaHype: 0 },
        resultText: 'O gringo continuou tímido e sem ritmo. Na primeira bola enfiada em campo, vocês bateram cabeça por falta de diálogo.',
      },
    ],
  },
  {
    id: 'falha_goleiro_decisivo',
    title: '🧤 O FRANGO DO GOLEIRO NO DERBY',
    tag: 'Vestiário',
    description:
      'O goleirão do seu time aceitou um chute de longe no meio das pernas e o clássico terminou empatado. No vestiário, ele está chorando com a cabeça entre as mãos.',
    options: [
      {
        id: 'opt_hug_keeper',
        label: 'Abraçar o goleiro na frente do grupo ("Ganhamos e perdemos juntos!")',
        description: 'Dar moral ao companheiro e blindar o grupo contra a crise.',
        effects: { coachTrust: 12, composure: 10, fanLove: 8 },
        resultText: 'Seu gesto de liderança contagiou o time! Todos abraçaram o goleiro, que prometeu fechar o gol na próxima partida.',
      },
      {
        id: 'opt_blame_keeper',
        label: 'Cobrar irritado: "A gente corre 90 minutos para tomar esse gol?"',
        description: 'Despejar a frustração de ter perdido os pontos.',
        effects: { coachTrust: -15, composure: -10, fanLove: -5 },
        resultText: 'O clima azedou totalmente! Os preparadores de goleiros tiveram que intervir e o vestiário rachou ao meio.',
      },
    ],
  },
  {
    id: 'churrasco_pos_derrota',
    title: '🥩 CHURRASCO MARCADO ANTES DO VEXAME',
    tag: 'Vestiário',
    description:
      'O elenco havia marcado um churrasco de confraternização para hoje à noite, mas o time acabou de tomar uma goleada humilhante de 4 a 0 em casa.',
    options: [
      {
        id: 'opt_cancel_bbq',
        label: 'Exigir o cancelamento imediato ("A torcida vai quebrar tudo")',
        description: 'Recolhimento e vergonha na cara após o vexame.',
        effects: { coachTrust: 10, fanLove: 10, energy: 5 },
        resultText: 'Você evitou uma crise sem precedentes! A torcida estava de tocaia na porta da churrascaria com rojões.',
      },
      {
        id: 'opt_secret_bbq',
        label: 'Manter o churrasco em sigilo no sítio do capitão',
        description: 'Lavar a roupa suja e beber cerveja para afogar as mágoas.',
        effects: { energy: -15, coachTrust: -10, mediaHype: 15 },
        resultText: 'Vazou foto de vocês com copo na mão nas redes sociais! A diretoria aplicou advertência e o ambiente ficou um inferno.',
      },
    ],
  },
  {
    id: 'apelido_maldoso',
    title: '🏷️ O APELIDO DA RESENHA NÃO AGRADOU',
    tag: 'Vestiário',
    description:
      'Os veteranos colocaram um apelido cômico e meio ofensivo em você no grupo de WhatsApp e o roupeiro até escreveu na sua chuteira com caneta.',
    options: [
      {
        id: 'opt_laugh_along',
        label: 'Entrar na brincadeira e zoar de volta com outro veterano',
        description: 'Mostrar jogo de cintura e ganhar o carinho da galera.',
        effects: { composure: 10, coachTrust: 5, fanLove: 5 },
        resultText: 'Você mandou uma figurinha hilária zoando o nariz do capitão! A resenha explodiu e você foi batizado como o mais querido do vestiário.',
      },
      {
        id: 'opt_get_furious',
        label: 'Fechar a cara e jogar a chuteira no chão com raiva',
        description: 'Exigir respeito profissional sem piadinhas.',
        effects: { composure: -10, coachTrust: -5 },
        resultText: 'O vestiário ficou em silêncio constrangedor. Eles pararam de te zoar, mas você ficou com fama de marrento e mimado.',
      },
    ],
  },
  {
    id: 'roupeiro_dificuldade',
    title: '👟 A RIFA DO ROUPEIRO DO CLUBE',
    tag: 'Vestiário',
    description:
      'Seu Tião, roupeiro que trabalha há 30 anos no clube por um salário mínimo, está rifando uma camisa antiga para pagar o tratamento dentário da neta.',
    options: [
      {
        id: 'opt_buy_all_rifa',
        label: 'Comprar a rifa inteira e doar R$ 5.000 para a cirurgia',
        description: 'Usar o salário para abençoar quem cuida das suas chuteiras.',
        effects: { money: -5000, coachTrust: 10, fanLove: 15, composure: 10 },
        resultText: 'Seu Tião chorou de emoção e te deu um abraço apertado. As suas chuteiras passaram a entrar em campo brilhando como ouro!',
      },
      {
        id: 'opt_buy_one_ticket',
        label: 'Comprar um bilhete simbólico de R$ 50',
        description: 'Ajudar com pouco para não se expor financeiramente.',
        effects: { money: -50, coachTrust: 0 },
        resultText: 'Você comprou o número 24. Seu Tião agradeceu com educação, mas esperava um pouco mais de generosidade das estrelas do time.',
      },
    ],
  },
  {
    id: 'fita_crepe_meia',
    title: '🧦 A POLÊMICA DO CORTE NO MEIÃO',
    tag: 'Vestiário',
    description:
      'Antes de subir para o gramado, você corta o meião oficial para usar meia antiderrapante. O quarto árbitro avisa que você só joga se cobrir tudo com esparadrapo da mesma cor.',
    options: [
      {
        id: 'opt_tape_it',
        label: 'Passar a fita rapidamente e seguir a regra sem chiar',
        description: 'Evitar cartão amarelo tolo antes do apito inicial.',
        effects: { composure: 5, coachTrust: 5 },
        resultText: 'Você ajustou o uniforme a tempo e entrou focado no aquecimento sem levar bronca da arbitragem.',
      },
      {
        id: 'opt_fight_referee',
        label: 'Discutir com o quarto árbitro ("Todo mundo na Premier League usa!")',
        description: 'Defender seu conforto e performance até o fim.',
        effects: { composure: -8, coachTrust: -5, mediaHype: 10 },
        resultText: 'O árbitro te deu uma advertência formal na súmula e você quase foi impedido de entrar no túnel!',
      },
    ],
  },
  {
    id: 'camisa_dez_vaga',
    title: '🔟 A DISPUTA PELA MÍTICA CAMISA 10',
    tag: 'Vestiário',
    description:
      'O camisa 10 titular foi negociado para a Turquia. A diretoria e a rouparia perguntam se você tem peito para assumir o número histórico da lenda do clube.',
    options: [
      {
        id: 'opt_take_ten',
        label: 'Assumir a camisa 10 com orgulho ("Nasci pronto!")',
        description: 'Abraçar a mística e os holofotes do protagonismo.',
        effects: { mediaHype: 25, fanLove: 15, coachTrust: 5, composure: -5 },
        resultText: 'As vendas da sua camisa explodiram nas lojas oficiais! A pressão por gols redobrou, mas o seu status virou de estrela nacional.',
      },
      {
        id: 'opt_keep_number',
        label: 'Manter seu número atual para construir sua própria história',
        description: 'Humildade e foco na bola, fugindo de comparações com ídolos antigos.',
        effects: { composure: 10, coachTrust: 8 },
        resultText: 'A imprensa elogiou sua sobriedade. Você provou que não precisa de um número mágico nas costas para ser o dono do time.',
      },
    ],
  },

  // --- 11 a 20: COMISSÃO TÉCNICA, TÁTICA & PROFESSOR ---
  {
    id: 'mudanca_posicao',
    title: '📋 O PROFESSOR QUER VOCÊ NA MARCAÇÃO',
    tag: 'Comissão Técnica',
    description:
      'O treinador te chama na prancheta: "O nosso lateral adversário apoia muito. Preciso que você volte até a nossa linha de fundo para marcar!".',
    options: [
      {
        id: 'opt_tactical_soldier',
        label: 'Bater continência e cumprir a função tática à risca',
        description: 'Ser o soldado do time e garantir a consistência defensiva.',
        effects: { coachTrust: 15, energy: -15, mediaHype: -5 },
        resultText: 'Você anulou o lateral rival com desarmes precisos! Na coletiva, o técnico te chamou de "o jogador mais inteligente do elenco".',
      },
      {
        id: 'opt_rebel_attacker',
        label: 'Reclamar: "Professor, se eu correr atrás de lateral, não vou ter perna pra decidir lá na frente"',
        description: 'Priorizar seus gols e o faro de artilheiro.',
        effects: { coachTrust: -15, mediaHype: 10, composure: 5 },
        resultText: 'O técnico te olhou torto e te substituiu aos 15 do segundo tempo. A torcida cobrou sua presença na área.',
      },
    ],
  },
  {
    id: 'substituicao_chuteira',
    title: '👟 CARA FEIA E CHUTEIRA VOANDO NO BANCO',
    tag: 'Comissão Técnica',
    description:
      'O quarto árbitro levanta a placa com o seu número aos 12 minutos do 2º tempo. Você estava jogando bem e o estádio está lotado.',
    options: [
      {
        id: 'opt_clap_bench',
        label: 'Bater palmas para a torcida e cumprimentar o colega que entra',
        description: 'Engolir a raiva e manter o respeito na frente das câmeras.',
        effects: { coachTrust: 10, fanLove: 10, composure: 10 },
        resultText: 'Postura impecável de ídolo! A torcida aplaudiu de pé e você demonstrou grandeza profissional.',
      },
      {
        id: 'opt_kick_cooler',
        label: 'Sair bufando, chutar o balde de isotônico e jogar o colete no chão',
        description: 'Exalar sua fúria e mostrar que não aceita ser sacado.',
        effects: { coachTrust: -20, mediaHype: 25, fanLove: -5 },
        resultText: 'O chute no balde virou meme nacional no Twitter! O técnico avisou à diretoria que vai te colocar para treinar separado.',
      },
    ],
  },
  {
    id: 'tecnico_balancando',
    title: '🚪 O TREINADOR BALANÇA NO CARGO',
    tag: 'Comissão Técnica',
    description:
      'Após três tropeços, a imprensa crava que o treinador cai se não vencer o clássico. Ele convoca uma reunião no quarto do hotel pedindo o apoio das lideranças.',
    options: [
      {
        id: 'opt_save_coach',
        label: '"Fechamos com o senhor até o fim, professor!"',
        description: 'Pacto de sangue pelo comandante para correr o dobro no clássico.',
        effects: { coachTrust: 20, energy: -10, composure: 5 },
        resultText: 'O time comeu grama em campo e venceu o clássico! O treinador foi aos prantos no vestiário e te agradeceu na entrevista.',
      },
      {
        id: 'opt_let_him_fall',
        label: 'Ficar neutro e deixar a diretoria decidir o futuro dele',
        description: 'Evitar se queimar com a diretoria caso a demissão seja certa.',
        effects: { coachTrust: -10, mediaHype: 5 },
        resultText: 'O empate morno no clássico selou a demissão dele na segunda-feira. O novo técnico contratado já começou cobrando reforços.',
      },
    ],
  },
  {
    id: 'treino_chuva_pesada',
    title: '🌧️ TEMPESTADE E TREINO DE DOIS TOQUES NO BARRO',
    tag: 'Comissão Técnica',
    description:
      'Chove torrencialmente no CT. A comissão técnica quer manter o treino físico intenso no barro, mas o gramado virou uma poça escorregadia propícia a lesões.',
    options: [
      {
        id: 'opt_train_hard',
        label: 'Calçar trava de ferro e dar carrinho na água com gana',
        description: 'Mostrar raça raiz de quem não tem medo de tempo ruim.',
        effects: { coachTrust: 10, energy: -20, fanLove: 8 },
        resultText: 'O vídeo de você deslizando no barro com garra viralizou na torcida! O preparador físico elogiou seu condicionamento de ferro.',
      },
      {
        id: 'opt_request_gym',
        label: 'Liderar o pedido para o elenco treinar na academia coberta',
        description: 'Preservar os músculos e evitar contusões estúpidas.',
        effects: { energy: 10, coachTrust: -5, composure: 5 },
        resultText: 'O treino foi transferido para a musculação. Ninguém se machucou, mas o auxiliar técnico comentou que "o futebol moderno está frouxo".',
      },
    ],
  },
  {
    id: 'novo_tecnico_gringo',
    title: '🇵🇹 CHEGOU O NOVO COMANDANTE EUROPEU',
    tag: 'Comissão Técnica',
    description:
      'Um técnico português rigoroso assume o clube. Ele proíbe celulares no refeitório, corta o pudim de sobremesa e exige gps até nas corridas de aquecimento.',
    options: [
      {
        id: 'opt_embrace_method',
        label: 'Adaptar-se com disciplina militar e puxar a fila nos testes',
        description: 'Conquistar o gringo pelo profissionalismo impecável.',
        effects: { coachTrust: 15, energy: -10, composure: 10 },
        resultText: 'O mister te elogiou em público: "Este rapaz tem mentalidade europeia de alto rendimento!". Você virou titular absoluto.',
      },
      {
        id: 'opt_mock_rules',
        label: 'Reclamar escondido no grupo: "Esse cara acha que descobriu a bola"',
        description: 'Manter a malandragem e resistir à cartilha autoritária.',
        effects: { coachTrust: -15, mediaHype: 10 },
        resultText: 'A conversa vazou para o analista de desempenho! O mister te mandou para o banco como lição pedagógica.',
      },
    ],
  },
  {
    id: 'falta_no_treino',
    title: '😴 O DESPERTADOR NÃO TOCOU NO DIA DO TÁTICO',
    tag: 'Comissão Técnica',
    description:
      'Você acorda assustado: o relógio marca 09h45 e o treino começou às 09h00! Há 14 chamadas perdidas do supervisor de futebol no seu telefone.',
    options: [
      {
        id: 'opt_rush_truth',
        label: 'Voar para o CT, admitir a cagada e pagar a caixinha do grupo',
        description: 'Dizer a verdade e assumir a multa financeira com hombridade.',
        effects: { money: -3000, coachTrust: -5, composure: 10 },
        resultText: 'Você chegou esbaforido às 10h15. O técnico te deu uma bronca dura na sala dele, mas respeitou a sua honestidade sem inventar desculpas.',
      },
      {
        id: 'opt_invent_flat_tire',
        label: 'Mandar foto de pneu furado do Google e dizer que engarrafou',
        description: 'Dar aquela miguelada clássica para escapar da multa.',
        effects: { coachTrust: -15, mediaHype: 10, money: 0 },
        resultText: 'O roupeiro descobriu a mesma foto idêntica num fórum de carros de 2018! A vergonha no grupo foi histórica e a multa dobrou.',
      },
    ],
  },
  {
    id: 'escala_vazada',
    title: '📱 O X-9 DO VESTIÁRIO VAZOU A ESCALAÇÃO',
    tag: 'Comissão Técnica',
    description:
      'A escalação secreta que o técnico treinou de portões fechados apareceu no Twitter de um setorista 20 minutos depois. O professor está cuspindo fogo.',
    options: [
      {
        id: 'opt_hunt_leaker',
        label: 'Apoiar a busca pelo traíra e propor recolher celulares antes do treino',
        description: 'Proteger o sigilo tático do elenco a ferro e fogo.',
        effects: { coachTrust: 12, composure: 5 },
        resultText: 'O técnico valorizou a sua lealdade. O ambiente ficou tenso, mas o time manteve o foco na vitória.',
      },
      {
        id: 'opt_calm_everyone',
        label: '"Professor, quem joga bola ganha com ou sem vazamento. Vamos pro jogo!"',
        description: 'Tirar o foco da caça às bruxas e focar na bola.',
        effects: { composure: 12, coachTrust: 5, fanLove: 5 },
        resultText: 'Sua tranquilidade acalmou os nervos do grupo. O time entrou em campo leve e atropelou o adversário.',
      },
    ],
  },
  {
    id: 'treino_falta_individual',
    title: '🎯 HORAS EXTRAS COBRANDO FALTAS',
    tag: 'Comissão Técnica',
    description:
      'O treino acabou, todos foram para a hidromassagem, mas você sente que sua batida de chapa na bola parada pode melhorar se calibrar mais 50 cobranças.',
    options: [
      {
        id: 'opt_stay_shooting',
        label: 'Ficar no campo com a barreira de metal até o sol se pôr',
        description: 'Evoluir na marra pelo suor e repetição incansável.',
        effects: { energy: -20, coachTrust: 10, composure: 15 },
        resultText: 'A bola começou a beijar a gaveta repetidamente! O técnico olhou da janela do escritório e anotou seu nome como batedor número 1.',
      },
      {
        id: 'opt_rest_body',
        label: 'Ir para a banheira de gelo e focar na recuperação muscular',
        description: 'Evitar sobrecarga e chegar com perna fresca no jogo.',
        effects: { energy: 15, composure: 5 },
        resultText: 'Seus músculos agradeceram o descanso. Você recuperou o fôlego total para a maratona de jogos.',
      },
    ],
  },
  {
    id: 'reclamacao_salario_comissao',
    title: '💸 A DIRETORIA PAGOU SÓ OS JOGADORES',
    tag: 'Comissão Técnica',
    description:
      'A diretoria atrasou os salários, mas depositou o direito de imagem das estrelas para acalmar os ânimos, deixando roupeiros, massagistas e fisioterapeutas sem nada.',
    options: [
      {
        id: 'opt_strike_for_staff',
        label: 'Avisar a diretoria que o time só treina quando o staff receber',
        description: 'Comprar o barulho de quem carrega o piano no clube.',
        effects: { coachTrust: 15, fanLove: 20, money: -2000 },
        resultText: 'Um ato de liderança histórico! A diretoria correu atrás de empréstimo e pagou todos os funcionários no mesmo dia. Você virou herói.',
      },
      {
        id: 'opt_stay_quiet_paid',
        label: 'Receber o seu e não se meter na política do clube',
        description: 'Evitar atrito com os diretores que assinam os cheques.',
        effects: { coachTrust: -10, fanLove: -10, money: 5000 },
        resultText: 'O staff ficou cabisbaixo e o clima no CT ficou fúnebre. A torcida descobriu a atitude fria e começou a chiar nas redes.',
      },
    ],
  },
  {
    id: 'doping_sorteio',
    title: '🧪 O SORTEIO DO EXAME ANTIDOPING SURPRESA',
    tag: 'Comissão Técnica',
    description:
      'Fiscais da CBF e da WADA desembarcam no vestiário pós-jogo para coletar urina de dois atletas. O seu nome foi a primeira bolinha sorteada no potinho.',
    options: [
      {
        id: 'opt_drink_water_pee',
        label: 'Beber 3 litros de água, esperar 2 horas e colaborar com calma',
        description: 'Consciência limpa de atleta limpo e profissional.',
        effects: { composure: 10, energy: -5 },
        resultText: 'A coleta foi um sucesso e o laudo veio 100% negativo! Você foi liberado para ir descansar em casa com a cabeça erguida.',
      },
      {
        id: 'opt_complain_tired',
        label: 'Reclamar da demora e quase bater boca com o fiscal de doping',
        description: 'Cansaço excessivo após 90 minutos de pura adrenalina.',
        effects: { composure: -10, coachTrust: -5, mediaHype: 5 },
        resultText: 'O fiscal relatou o destempero na ata! Quase gerou uma investigação por desrespeito à autoridade médica.',
      },
    ],
  },

  // --- 21 a 30: IMPRENSA, REDES SOCIAIS & POLÊMICAS ---
  {
    id: 'zona_mista_provocacao',
    title: '🎙️ CASCA DE BANANA NA ZONA MISTA',
    tag: 'Imprensa',
    description:
      'Um repórter sensacionalista enfia o microfone na sua cara: "O centroavante rival disse que a zaga do seu time é uma piada. O que você tem a dizer?".',
    options: [
      {
        id: 'opt_classy_answer',
        label: '"A resposta a gente dá é com a bola rolando domingo"',
        description: 'Frieza clássica de jogador experiente.',
        effects: { coachTrust: 10, composure: 10, mediaHype: 5 },
        resultText: 'Resposta de manual! O treinador adorou a postura e a torcida elogiou sua maturidade nas redes.',
      },
      {
        id: 'opt_trash_talk',
        label: '"Ele falou isso? Domingo nós vamos passar por cima deles sem dó!"',
        description: 'Colocar fogo no clássico e inflamar a torcida.',
        effects: { fanLove: 20, mediaHype: 30, coachTrust: -10, composure: -5 },
        resultText: 'Manchete no ge.globo em 5 minutos! Os ingressos para o clássico esgotaram em 2 horas e o vestiário rival colou sua frase na parede.',
      },
    ],
  },
  {
    id: 'story_instagram_vazado',
    title: '📸 O STORY NOS "MELHORES AMIGOS" QUE VAZOU',
    tag: 'Redes Sociais',
    description:
      'Você postou um vídeo cantando pagode e comemorando no domingo à noite, mas algum suposto amigo tirou print e mandou para páginas de fofoca de futebol.',
    options: [
      {
        id: 'opt_delete_apologize',
        label: 'Postar nota oficial de retratação assinada pela assessoria',
        description: 'Pedir desculpas à torcida pelo momento inoportuno.',
        effects: { mediaHype: 5, fanLove: -5, coachTrust: 5 },
        resultText: 'O assunto morreu em 48 horas. Você aprendeu a lição e limpou 80 pessoas falsas da sua lista de amigos.',
      },
      {
        id: 'opt_double_down',
        label: 'Dar de ombros: "No meu dia de folga eu faço o que quiser"',
        description: 'Defender seu direito à privacidade e vida pessoal.',
        effects: { mediaHype: 25, coachTrust: -15, fanLove: -10 },
        resultText: 'Os comentaristas de mesa redonda debateram sua maturidade por 3 dias seguidos. A pressão da torcida aumentou para o jogo.',
      },
    ],
  },
  {
    id: 'comentarista_pesado',
    title: '📺 O COMENTARISTA DO PROGRAMA DA TARDE TE DETONOU',
    tag: 'Imprensa',
    description:
      'Um ex-jogador que virou comentarista polêmico na televisão disse ao vivo que você "é uma farsa fabricada pelo empresário e pela mídia".',
    options: [
      {
        id: 'opt_silence_field',
        label: 'Ficar em silêncio absoluto e guardar a raiva para o campo',
        description: 'Responder com gol e assistência na próxima rodada.',
        effects: { composure: 15, coachTrust: 8, energy: 5 },
        resultText: 'No jogo seguinte, você fez um golaço e na comemoração fez o gesto de pedir silêncio! O comentarista teve que engolir o orgulho.',
      },
      {
        id: 'opt_twitter_reply',
        label: 'Postar tweet irônico zoando a carreira modesta do comentarista',
        description: 'Lavar a alma na internet com exposed de títulos.',
        effects: { mediaHype: 35, coachTrust: -10, fanLove: 15, composure: -10 },
        resultText: 'O tweet teve 80 mil curtidas! O comentarista abriu o programa com a sua cara na tela e a polêmica pegou fogo.',
      },
    ],
  },
  {
    id: 'dancinha_tiktok',
    title: '🕺 A COREOGRAFIA DO TIKTOK DA MODA',
    tag: 'Redes Sociais',
    description:
      'Antes da partida decisiva, os novatos do time criaram uma dancinha viral no vestiário e te chamaram para gravar a comemoração do próximo gol.',
    options: [
      {
        id: 'opt_do_tiktok',
        label: 'Aprender os passinhos e mandar a dança ao vivo no gol',
        description: 'Carisma, juventude e conexão com o público jovem.',
        effects: { mediaHype: 25, fanLove: 15, coachTrust: -5 },
        resultText: 'O vídeo bateu 10 milhões de visualizações no TikTok! Sua imagem bombou no mundo todo, embora os tradicionalistas tenham resmungado.',
      },
      {
        id: 'opt_embrace_classic',
        label: 'Comemorar socando o ar estilo Pelé ou correndo para a galera',
        description: 'Futebol clássico, raça pura e respeito à tradição.',
        effects: { fanLove: 15, coachTrust: 10, composure: 10 },
        resultText: 'A torcida na arquibancada veio abaixo de emoção! Uma foto épica do seu grito de gol virou papel de parede de milhares de fãs.',
      },
    ],
  },
  {
    id: 'live_twitch_madrugada',
    title: '🎮 LIVE DE CS2 ATÉ AS 3H DA MANHÃ',
    tag: 'Extracampo',
    description:
      'Na folga de terça-feira, você abriu live jogando com streamers famosos. A live bombou com 50 mil pessoas, mas terminou às 03h30 da madruga.',
    options: [
      {
        id: 'opt_sleep_heavy',
        label: 'Beber café forte e ir treinar de cara limpa na quarta',
        description: 'Segurar o sono na marra para não perder a intensidade.',
        effects: { energy: -25, mediaHype: 15, money: 5000 },
        resultText: 'Você ganhou R$ 5.000 em doações na live, mas suas pernas pesavam 100 kg no treino. O preparador físico percebeu o cansaço.',
      },
      {
        id: 'opt_cut_stream_early',
        label: 'Desligar a live pontualmente às 22h ("Tenho que dormir cedo, chat")',
        description: 'Colocar o sono anabólico e o profissionalismo em 1º lugar.',
        effects: { energy: 10, composure: 10, coachTrust: 5 },
        resultText: 'Seus seguidores elogiaram sua dedicação de atleta de elite! Você acordou 100% voando para o treino tático.',
      },
    ],
  },
  {
    id: 'podcast_convite',
    title: '🎙️ CONVITE VIP PARA O MAIOR PODCAST DO PAÍS',
    tag: 'Imprensa',
    description:
      'Os apresentadores do PodPah te convidam para uma resenha de 3 horas com cerveja, histórias de vestiário e bastidores sem filtro.',
    options: [
      {
        id: 'opt_go_podcast',
        label: 'Aceitar o convite e abrir o coração com carisma e humor',
        description: 'Explosão de carisma e aproximação com os fãs do Brasil.',
        effects: { mediaHype: 35, fanLove: 20, coachTrust: -5, money: 10000 },
        resultText: 'O episódio bateu recorde de audiência! Todo mundo adorou sua humildade e as histórias engraçadas do seu começo de carreira.',
      },
      {
        id: 'opt_postpone_pod',
        label: 'Agradecer e pedir para adiar para as férias de fim de ano',
        description: 'Foco exclusivo na reta final do campeonato.',
        effects: { coachTrust: 10, composure: 10 },
        resultText: 'O técnico elogiou seu foco inabalável. Os apresentadores respeitaram sua seriedade e prometeram guardar a data das férias.',
      },
    ],
  },
  {
    id: 'fake_news_transferencia',
    title: '📰 JORNALISTA CRAVA SUA IDA PARA O MAIOR RIVAL',
    tag: 'Imprensa',
    description:
      'Um blogueiro com 1 milhão de seguidores posta: "BOMBA: Camisa 9 acertou pré-contrato com o rival e já procura casa no novo bairro".',
    options: [
      {
        id: 'opt_deny_passion',
        label: 'Gravar vídeo desmentindo veementemente e beijando o escudo',
        description: 'Jurar amor à torcida atual e desmascarar a mentira.',
        effects: { fanLove: 25, mediaHype: 15, coachTrust: 8 },
        resultText: 'A torcida adotou você como ídolo intocável! O blogueiro teve que apagar o post e pedir desculpas públicas.',
      },
      {
        id: 'opt_say_nothing_agent',
        label: 'Deixar seu empresário responder com nota fria e seguir focado',
        description: 'Não dar palco para especulações sem fundamento.',
        effects: { composure: 10, mediaHype: -5 },
        resultText: 'A poeira baixou rapidamente. Você evitou desgaste emocional desnecessário.',
      },
    ],
  },
  {
    id: 'biografia_autorizada',
    title: '📚 PROPOSTA PARA ESCREVER LIVRO BIOGRÁFICO',
    tag: 'Carreira',
    description:
      'Uma grande editora oferece um adiantamento de R$ 30.000 para lançar sua biografia: "A trajetória do garoto da várzea que conquistou os gramados".',
    options: [
      {
        id: 'opt_write_book',
        label: 'Assinar o contrato e conceder entrevistas para o biógrafo',
        description: 'Eternizar sua história e reforçar o saldo bancário.',
        effects: { money: 30000, mediaHype: 20, energy: -5 },
        resultText: 'O livro entrou na lista dos mais vendidos! Crianças de todo o país mandam cartas dizendo que se inspiram em você.',
      },
      {
        id: 'opt_too_early',
        label: 'Recusar ("Ainda tenho muita história para escrever dentro de campo")',
        description: 'Humildade de quem acha que o auge ainda está por vir.',
        effects: { composure: 12, coachTrust: 5 },
        resultText: 'Sua resposta causou admiração geral. A crítica destacou sua fome incessante de títulos futuros.',
      },
    ],
  },
  {
    id: 'flagra_shopping',
    title: '🛍️ ENCONTRO TENSO NO SHOPPING PÓS-DERROTA',
    tag: 'Torcida',
    description:
      'Você vai ao cinema do shopping na segunda-feira após perder um jogo. Um torcedor furioso te aborda na fila da pipoca cobrando satisfações na frente de todos.',
    options: [
      {
        id: 'opt_talk_calmly',
        label: 'Ouvir a cobrança com respeito e dizer que o time vai se recuperar',
        description: 'Desarmar o cidadão com serenidade e diálogo civilizado.',
        effects: { composure: 15, fanLove: 10, coachTrust: 5 },
        resultText: 'O torcedor se desarmou diante da sua calma: "Pô, valeu irmão, desculpa a exaltação, a gente só quer raça". Ele até pediu um autógrafo!',
      },
      {
        id: 'opt_call_security',
        label: 'Chamar os seguranças e reclamar de invasão de privacidade',
        description: 'Fazer valer seus direitos de cidadão no momento de folga.',
        effects: { fanLove: -15, mediaHype: 15, composure: -5 },
        resultText: 'Outros torcedores filmaram a confusão gritando "Mercenário!". O vídeo rodou grupos de WhatsApp o dia inteiro.',
      },
    ],
  },
  {
    id: 'documentario_netflix',
    title: '🎥 CÂMERAS DA NETFLIX NOS BASTIDORES',
    tag: 'Imprensa',
    description:
      'Uma equipe de filmagem internacional está rodando uma série documental no clube e pede para colocar um microfone de lapela no seu peito durante todo o treino.',
    options: [
      {
        id: 'opt_wear_mic',
        label: 'Aceitar o microfone e soltar tiradas engraçadas e liderança',
        description: 'Virar a grande estrela e o personagem carismático da série.',
        effects: { mediaHype: 30, fanLove: 15, coachTrust: -5 },
        resultText: 'O trailer da série destacou suas piadas no vestiário! Seu número de seguidores no Instagram subiu em 200 mil em um único dia.',
      },
      {
        id: 'opt_refuse_mic',
        label: 'Pedir desculpas e preferir discrição total no ambiente de trabalho',
        description: 'Manter a concentração 100% no futebol.',
        effects: { coachTrust: 10, composure: 10 },
        resultText: 'O treinador te agradeceu: "Isso aí garoto, o nosso trabalho é sério, não somos atores de novela".',
      },
    ],
  },

  // --- 31 a 40: TORCIDA, PAIXÃO & ARQUIBANCADA ---
  {
    id: 'torcida_organizada_ct',
    title: '🥁 INVASÃO PACÍFICA DA ORGANIZADA NO CT',
    tag: 'Torcida',
    description:
      'Líderes de todas as organizadas entram no campo do CT com tambores e bandeiras exigindo uma reunião cara a cara com o elenco antes da final.',
    options: [
      {
        id: 'opt_face_leaders',
        label: 'Dar um passo à frente como líder e discursar com firmeza',
        description: 'Prometer suor e sangue na decisão de domingo.',
        effects: { fanLove: 25, composure: 10, coachTrust: 10 },
        resultText: 'O presidente da organizada puxou um coro com o seu nome! A torcida acendeu sinalizadores e prometeu o maior mosaico da história.',
      },
      {
        id: 'opt_hide_behind',
        label: 'Ficar no fundo do pelotão calado esperando a reunião acabar',
        description: 'Evitar se comprometer com cobranças perigosas.',
        effects: { fanLove: -10, composure: -5 },
        resultText: 'A torcida foi embora sem incidentes, mas notou que você não deu a cara a bater no momento de pressão.',
      },
    ],
  },
  {
    id: 'torcedor_mirim_hospital',
    title: '🏥 VISITA SURPRESA AO HOSPITAL INFANTIL',
    tag: 'Torcida',
    description:
      'Um menino internado de 8 anos fez um desenho seu com a legenda: "Meu sonho é conhecer meu camisa favorito". Você foi convidado para visitá-lo.',
    options: [
      {
        id: 'opt_visit_kid',
        label: 'Ir pessoalmente, levar sua camisa autografada e passar a tarde com ele',
        description: 'O verdadeiro propósito do futebol que emociona corações.',
        effects: { fanLove: 30, composure: 15, money: -1000 },
        resultText: 'O sorriso da criança ao te ver foi inesquecível! A reportagem do encontro levou lágrimas a milhões de telespectadores.',
      },
      {
        id: 'opt_send_video',
        label: 'Mandar um vídeo de WhatsApp e enviar a camisa pelo correio',
        description: 'Ajudar à distância mantendo sua rotina de treinos.',
        effects: { fanLove: 10, composure: 5 },
        resultText: 'A família ficou muito feliz com o vídeo e postou agradecendo seu carinho.',
      },
    ],
  },
  {
    id: 'camisa_devolvida',
    title: '👕 A CAMISA JOGADA DE VOLTA DA ARQUIBANCADA',
    tag: 'Torcida',
    description:
      'Após um revés duro, você vai até a grade aplaudir os torcedores e joga sua camisa para eles. Um fã enfurecido atira a camisa de volta no gramado.',
    options: [
      {
        id: 'opt_pick_shirt_kiss',
        label: 'Pegar a camisa do chão, beijar o manto e sair de cabeça erguida',
        description: 'Respeito absoluto ao clube mesmo sob vaias dolorosas.',
        effects: { composure: 20, fanLove: 15, coachTrust: 10 },
        resultText: 'Um ato de pura nobreza! A imagem de você beijando o escudo recolhido calou as críticas e comoveu os conselheiros do clube.',
      },
      {
        id: 'opt_kick_shirt_tunnel',
        label: 'Chutar a camisa para longe e descer furioso para o túnel',
        description: 'Reagir à ingratidão com o sangue quente.',
        effects: { fanLove: -30, mediaHype: 25, coachTrust: -15 },
        resultText: 'O desrespeito ao manto sagrado revoltou a diretoria! Você foi multado e terá que pedir perdão publicamente aos sócios.',
      },
    ],
  },
  {
    id: 'mural_graffiti',
    title: '🎨 GRAFITE DO SEU ROSTO NO MURO DO ESTÁDIO',
    tag: 'Torcida',
    description:
      'Um coletivo de artistas da torcida pintou um grafite gigante de 10 metros com o seu rosto no muro de entrada do estádio.',
    options: [
      {
        id: 'opt_paint_wall',
        label: 'Visitar o local, autografar a parede e tirar foto com a comunidade',
        description: 'Valorizar a cultura de rua e retribuir a homenagem.',
        effects: { fanLove: 25, mediaHype: 15, composure: 10 },
        resultText: 'A foto com a lata de spray virou capa de caderno e foto de perfil de milhares de torcedores! Sua identificação é histórica.',
      },
      {
        id: 'opt_post_thank_you',
        label: 'Apenas repostar no Instagram com um emoji de coração',
        description: 'Agradecer virtualmente de forma rápida.',
        effects: { fanLove: 8, mediaHype: 5 },
        resultText: 'Os artistas ficaram felizes pelo repost, embora torcessem por uma visita presencial para conhecer o ídolo.',
      },
    ],
  },
  {
    id: 'cobrança_aeroporto',
    title: '✈️ PIPOCA E CORREDOR POLONÊS NO AEROPORTO',
    tag: 'Torcida',
    description:
      'O voo do time pousa às 02h da manhã e 300 torcedores enfurecidos esperam no saguão com pipoca e gritos de "Acabou a paz!".',
    options: [
      {
        id: 'opt_airport_escort',
        label: 'Seguir o cordão da Polícia Militar direto para o ônibus sem olhar',
        description: 'Preservar a integridade física e evitar pancadaria.',
        effects: { composure: 5, fanLove: -5 },
        resultText: 'A delegação entrou em segurança no ônibus sob chuva de gritos. Você evitou qualquer entrevero físico.',
      },
      {
        id: 'opt_stop_and_talk',
        label: 'Parar na frente da grade e pedir calma: "A gente vai dar a vida domingo!"',
        description: 'Coragem extrema de encarar a massa olho no olho.',
        effects: { fanLove: 20, composure: 15, coachTrust: 8 },
        resultText: 'Os líderes da torcida pediram silêncio para te ouvir. Eles reconheceram a sua honra de homem e aplaudiram sua coragem!',
      },
    ],
  },
  {
    id: 'musica_personalizada',
    title: '🎶 O NOVO CANTO DA TORCIDA EM SEU NOME',
    tag: 'Torcida',
    description:
      'A bateria da torcida compôs um ritmo novo com letra personalizada elogiando seus chutes de falta e sua raça em campo.',
    options: [
      {
        id: 'opt_sing_with_them',
        label: 'Bater no peito, pular no aquecimento e reger a bateria',
        description: 'Entrar na vibração da arquibancada e virar o regente da festa.',
        effects: { energy: 15, fanLove: 20, mediaHype: 10 },
        resultText: 'O estádio inteiro cantou junto em uníssono! A adrenalina correu pelas suas veias e você entrou em campo como um leão.',
      },
      {
        id: 'opt_nod_solemnly',
        label: 'Apenas acenar com a cabeça focado no alongamento',
        description: 'Guardar toda a energia mental para as quatro linhas.',
        effects: { composure: 10, coachTrust: 5 },
        resultText: 'Foco cirúrgico. Você não se deixou levar pela euforia antecipada e manteve os pés no chão.',
      },
    ],
  },
  {
    id: 'ingressos_familiares',
    title: '🎟️ O PEDIDO DE 80 INGRESSOS PARA A FAMÍLIA',
    tag: 'Torcida',
    description:
      'Na semana do clássico, seus parentes e amigos distantes te pedem 80 ingressos de camarote que custariam R$ 16.000 do seu bolso.',
    options: [
      {
        id: 'opt_buy_all_tickets',
        label: 'Comprar todos os ingressos e fretar van para todo mundo',
        description: 'Alegria da família inteira reunida na arquibancada.',
        effects: { money: -16000, composure: 5, fanLove: 5 },
        resultText: 'A família fez uma festa inesquecível no camarote com camisa personalizada! A grana foi pesada, mas o orgulho da sua mãe não tem preço.',
      },
      {
        id: 'opt_limit_tickets',
        label: 'Liberar apenas 4 ingressos para pais e irmãos e dizer "não" ao resto',
        description: 'Cortar abusos e manter a sanidade financeira e foco mental.',
        effects: { composure: 10, money: 0 },
        resultText: 'Alguns primos ficaram emburrados no grupo de WhatsApp, mas você blindou sua conta bancária e manteve o foco na partida.',
      },
    ],
  },
  {
    id: 'mascote_brincadeira',
    title: '🦊 A TRAVESSURA DO MASCOTE DO CLUBE',
    tag: 'Torcida',
    description:
      'O mascote fantasiado do clube te puxa para uma dancinha cômica com a bandeirinha de escanteio antes de começar o clássico.',
    options: [
      {
        id: 'opt_dance_mascot',
        label: 'Entrar na pilha do mascote e fazer a festa da criançada',
        description: 'Espalhar alegria no estádio antes do apito.',
        effects: { fanLove: 15, mediaHype: 10, composure: 5 },
        resultText: 'O estádio gargalhou e aplaudiu! O clima ficou descontraído e a torcida acolheu o time com enorme energia positiva.',
      },
      {
        id: 'opt_refuse_mascot',
        label: 'Fazer sinal de que está concentrado e pedir licença',
        description: 'Postura séria de quem está indo para uma batalha.',
        effects: { coachTrust: 8, composure: 5 },
        resultText: 'O mascote correu para outro lado. O técnico comentou com o auxiliar que gostou da sua cara fechada de guerreiro.',
      },
    ],
  },
  {
    id: 'leilao_beneficente',
    title: '🎗️ LEILÃO BENEFICENTE DE NATAL DA CIDADE',
    tag: 'Torcida',
    description:
      'A prefeitura organiza um jantar beneficente para arrecadar agasalhos e alimentos para comunidades carentes e pede sua presença e uma doação.',
    options: [
      {
        id: 'opt_donate_heavy',
        label: 'Doar R$ 20.000 e a chuteira da final para o leilão',
        description: 'Solidariedade de quem veio de baixo e nunca esquece as raízes.',
        effects: { money: -20000, fanLove: 30, composure: 15, mediaHype: 15 },
        resultText: 'Sua doação garantiu cestas básicas para 500 famílias! O prefeito te concedeu o título de Cidadão Benemérito da cidade.',
      },
      {
        id: 'opt_donate_shirt',
        label: 'Doar apenas uma camisa autografada para o sorteio',
        description: 'Contribuir de forma simples sem mexer no patrimônio.',
        effects: { fanLove: 10, composure: 5 },
        resultText: 'A camisa foi arrematada por R$ 3.000 e ajudou bastante a entidade local. Você fez a sua parte com serenidade.',
      },
    ],
  },
  {
    id: 'sinalizador_punicao',
    title: '🔥 SINALIZADORES E RISCO DE PERDA DE MANDO',
    tag: 'Torcida',
    description:
      'A torcida acende 50 sinalizadores proibidos na arquibancada. O árbitro paralisa o jogo e avisa que se não apagarem, o clube perderá pontos no STJD.',
    options: [
      {
        id: 'opt_beg_fans_extinguish',
        label: 'Correr até a grade, erguer as mãos e implorar para apagarem',
        description: 'Usar sua influência para salvar os pontos do time.',
        effects: { coachTrust: 15, composure: 15, fanLove: 10 },
        resultText: 'A torcida atendeu imediatamente ao seu pedido e apagou as chamas sob aplausos! O jogo recomeçou e o clube escapou de suspensão.',
      },
      {
        id: 'opt_stay_water_bench',
        label: 'Ir beber água no banco e esperar a polícia agir',
        description: 'Não se expor a vaias ou faíscas da grade.',
        effects: { composure: 0, coachTrust: -5 },
        resultText: 'A paralisação durou 15 minutos e esfriou o time. O clube acabou denunciado na procuradoria desportiva.',
      },
    ],
  },

  // --- 41 a 52: EXTRACAMPO, CARREIRA, GRANA & BASTIDORES ---
  {
    id: 'balada_parcas',
    title: '🎉 BALADA NA QUINTA-FEIRA COM OS PARÇAS',
    tag: 'Extracampo',
    description:
      'Seus amigos de infância chegaram na cidade e organizaram uma festa com funk e pagode. O clássico decisivo é no domingo.',
    options: [
      {
        id: 'opt_sleep',
        label: 'Dizer não e ficar concentrado em casa assistindo futebol',
        description: 'Foco total no clássico de domingo. Seu corpo agradece.',
        effects: { energy: 15, coachTrust: 10, fanLove: 5 },
        resultText: 'Você recusou com maturidade. O treinador elogiou sua postura e dedicação no treino da manhã seguinte!',
      },
      {
        id: 'opt_peek',
        label: 'Dar apenas uma passada rápida de 1 hora para dar um abraço',
        description: 'Ver os amigos rápido e voltar antes da meia-noite.',
        effects: { energy: -10, fanLove: 5, money: -800 },
        resultText: 'Você pagou uma rodada de refrigerante para os amigos e foi embora cedo. Foi tranquilo, mas você acordou um pouco cansado.',
      },
      {
        id: 'opt_party_hard',
        label: 'Curtir a noite toda ("A vida é uma só!")',
        description: 'Camarote, pagode até o amanhecer e bancar a conta da tropa.',
        effects: { energy: -30, coachTrust: -20, fanLove: -15, money: -5000, mediaHype: 20 },
        resultText: 'Vídeos seus no palco vazaram nas redes sociais! A torcida organizada foi cobrar satisfação no CT e você foi para o banco.',
      },
    ],
  },
  {
    id: 'carro_esportivo_importado',
    title: '🏎️ A COMPRA DO SUPERESPORTIVO DE R$ 150.000',
    tag: 'Extracampo',
    description:
      'Com o primeiro grande bicho da temporada na conta, uma concessionária te oferece uma Porsche amarela chamativa com parcelas camaradas.',
    options: [
      {
        id: 'opt_buy_supercar',
        label: 'Comprar a máquina e chegar acelerando no CT na terça',
        description: 'Realizar o sonho de infância e desfilar com estilo.',
        effects: { money: -50000, mediaHype: 25, coachTrust: -5 },
        resultText: 'O ronco do motor chamou a atenção de todos os repórteres no estacionamento! O capitão veterano te deu um conselho de manter o pé no chão.',
      },
      {
        id: 'opt_invest_real_estate',
        label: 'Guardar a grana e comprar imóveis para alugar no seu estado',
        description: 'Construir patrimônio sólido para a aposentadoria futura.',
        effects: { money: 10000, composure: 15, coachTrust: 5 },
        resultText: 'Sua inteligência financeira impressionou a diretoria! Você garantiu renda passiva que renderá frutos para o resto da vida.',
      },
    ],
  },
  {
    id: 'mala_branca_incentivo',
    title: '💼 A MALA BRANCA DO CLUBE RIVAL',
    tag: 'Bastidores',
    description:
      'Um diretor de um clube concorrente manda um emissário com uma mala de R$ 40.000 em dinheiro para cada jogador se vocês vencerem o líder do campeonato.',
    options: [
      {
        id: 'opt_accept_mala',
        label: 'Aceitar o bicho extra ("Ganhar para vencer é legítimo")',
        description: 'Motivação financeira extra para correr o dobro em campo.',
        effects: { money: 40000, energy: -10, composure: -5 },
        resultText: 'O time jogou como se fosse final de Copa do Mundo e venceu o líder! O dinheiro entrou na conta em espécie, sem deixar rastros.',
      },
      {
        id: 'opt_refuse_mala',
        label: 'Recusar com firmeza ("A gente joga pela honra da nossa camisa")',
        description: 'Manter a ética profissional intocada.',
        effects: { coachTrust: 15, composure: 15 },
        resultText: 'Você expulsou o emissário do hotel! O vestiário sentiu o brio ferido e venceu a partida na pura raça e dignidade.',
      },
    ],
  },
  {
    id: 'proposta_arabia_astronomica',
    title: '🇸🇦 A PROPOSTA MULTIMILIONÁRIA DA ARÁBIA SAUDITA',
    tag: 'Carreira',
    description:
      'Um xeque árabe oferece um salário 8 vezes maior do que você ganha atualmente, mansão com piscina de borda infinita e dois carros de luxo na garagem.',
    options: [
      {
        id: 'opt_dream_saudi',
        label: 'Pressionar seu empresário para fechar o negócio ("Independência financeira")',
        description: 'Garantir o futuro de três gerações da sua família.',
        effects: { mediaHype: 30, coachTrust: -10, composure: 5 },
        resultText: 'A notícia causou um terremoto no clube! A diretoria correu para tentar uma contraproposta, enquanto a torcida teme sua partida.',
      },
      {
        id: 'opt_stay_titles',
        label: 'Avisar que quer continuar para ser campeão e chegar à Seleção',
        description: 'Priorizar a glória esportiva e o sonho da amarelinha.',
        effects: { fanLove: 30, coachTrust: 15, mediaHype: 15 },
        resultText: 'A torcida cantou seu nome em coro no treino! Sua lealdade ao projeto esportivo te consagrou como o maior xodó da arquibancada.',
      },
    ],
  },
  {
    id: 'apostador_direct_instagram',
    title: '⚠️ MENSAGEM SUSPEITA DE APOSTAS NO DIRECT',
    tag: 'Bastidores',
    description:
      'Um perfil fake manda mensagem no seu Instagram oferecendo R$ 30.000 para você cavar um cartão amarelo aos 20 minutos do primeiro tempo.',
    options: [
      {
        id: 'opt_report_police',
        label: 'Tirar prints e denunciar imediatamente à diretoria e à Polícia Federal',
        description: 'Tolerância zero com manipulação de resultados e esquemas ilegais.',
        effects: { coachTrust: 25, composure: 20, fanLove: 20 },
        resultText: 'A Polícia Federal abriu uma operação e prendeu a quadrilha! O presidente da CBF te enviou uma carta de elogio por sua conduta exemplar.',
      },
      {
        id: 'opt_block_ignore',
        label: 'Apenas bloquear o contato e não falar nada para ninguém',
        description: 'Evitar dor de cabeça e delegacias.',
        effects: { composure: 5 },
        resultText: 'Você bloqueou o usuário. O lance morreu ali, mas você jogou a partida inteira com medo de levar cartão involuntário.',
      },
    ],
  },
  {
    id: 'namoro_famosa',
    title: '❤️ O NAMORO COM A ATRIZ DE NOVELA',
    tag: 'Extracampo',
    description:
      'Você começou a namorar uma influenciadora/atriz famosa. Paparazzis agora passam 24 horas por dia de plantão na porta da sua casa e do CT.',
    options: [
      {
        id: 'opt_manage_fame',
        label: 'Manter discrição total e focar os treinos dentro do campo',
        description: 'Separar amor e profissão sem deixar o ego subir à cabeça.',
        effects: { composure: 10, coachTrust: 5, fanLove: 10 },
        resultText: 'O relacionamento seguiu saudável e sua imagem pública ficou muito simpática para marcas e anunciantes familiares.',
      },
      {
        id: 'opt_red_carpet',
        label: 'Frequentar todos os tapetes vermelhos e eventos de gala',
        description: 'Virar um casal de celebridade nacional estilo Beckham.',
        effects: { mediaHype: 35, money: 15000, energy: -15, coachTrust: -10 },
        resultText: 'Você fechou campanhas milionárias de perfume! Mas as viagens de madrugada para o Rio de Janeiro pesaram nas suas pernas.',
      },
    ],
  },
  {
    id: 'emprestimo_amigo_infancia',
    title: '🤝 O EMPRÉSTIMO PARA O AMIGO DA QUEBRADA',
    tag: 'Extracampo',
    description:
      'Um amigo que dividia pão com você na infância pede R$ 20.000 emprestados para abrir uma lanchonete e tentar mudar de vida.',
    options: [
      {
        id: 'opt_give_money_free',
        label: 'Doar a quantia sem esperar de volta ("Não é empréstimo, é gratidão")',
        description: 'Honrar quem esteve ao seu lado quando você não tinha nada.',
        effects: { money: -20000, composure: 20, fanLove: 10 },
        resultText: 'A lanchonete virou um sucesso no bairro! Toda vez que você visita sua comunidade, é recebido com fogos de artifício e amor genuíno.',
      },
      {
        id: 'opt_deny_politely',
        label: 'Recusar educadamente e indicar um curso de capacitação',
        description: 'Não misturar amizade profunda com transações de dinheiro.',
        effects: { composure: -5, money: 0 },
        resultText: 'O amigo se sentiu desprezado e parou de responder suas mensagens. Você economizou a grana, mas o peso no coração ficou.',
      },
    ],
  },
  {
    id: 'patrocinio_chuteira_gringa',
    title: '👟 A GUERRA ENTRE NIKE E ADIDAS NOS SEUS PÉS',
    tag: 'Carreira',
    description:
      'O contrato com a sua fornecedora de chuteiras expirou. Uma marca rival oferece o dobro do valor, mas exige que você use um modelo cano alto chamativo.',
    options: [
      {
        id: 'opt_switch_brand',
        label: 'Assinar com a rival pela bolada de R$ 60.000 no ato',
        description: 'Maximizar seu valor de mercado com novas cores vibrantes.',
        effects: { money: 60000, mediaHype: 20, composure: 5 },
        resultText: 'Você calçou as novas chuteiras douradas e o anúncio estampou outdoors pela capital! Dinheiro grosso na sua conta corrente.',
      },
      {
        id: 'opt_stay_loyal_brand',
        label: 'Renovar com a marca antiga que te apoiou desde a base',
        description: 'Lealdade e conforto com a chuteira que nunca te deu bolhas.',
        effects: { money: 30000, coachTrust: 5, composure: 10 },
        resultText: 'Eles criaram uma linha com as iniciais do seu nome gravadas no calcanhar. Conforto total para continuar marcando gols.',
      },
    ],
  },
  {
    id: 'camarote_carnaval',
    title: '🎭 CONVITE PARA DESTAQUE DE ESCOLA DE SAMBA',
    tag: 'Extracampo',
    description:
      'Em pleno Carnaval, a maior escola de samba da cidade te convida para desfilar no topo de um carro alegórico na madrugada de segunda para terça.',
    options: [
      {
        id: 'opt_parade_carnaval',
        label: 'Subir no carro alegórico com fantasia de luxo e cantar o samba',
        description: 'Viver a experiência cultural máxima do povo brasileiro.',
        effects: { fanLove: 25, mediaHype: 30, energy: -25, coachTrust: -15 },
        resultText: 'A Sapucaí/Anhembi vibrou com a sua simpatia! Você foi o destaque do jornal na manhã seguinte, mas suas panturrilhas quase travaram.',
      },
      {
        id: 'opt_stay_home_carnaval',
        label: 'Assistir ao desfile pela televisão debaixo do edredom',
        description: 'Descanso sagrado de quem prioriza o rendimento em campo.',
        effects: { energy: 15, coachTrust: 10, composure: 10 },
        resultText: 'Enquanto vários atletas chegaram de ressaca, você treinou com a explosão física de um motor V8. O técnico notou a diferença!',
      },
    ],
  },
  {
    id: 'reforma_casa_mae',
    title: '🏡 A REFORMA DA CASA DA SUA MÃE',
    tag: 'Extracampo',
    description:
      'Sua mãe ainda mora na casa simples da infância onde o teto goteja quando chove. Ela resiste a se mudar, mas aceita uma reforma completa de R$ 35.000.',
    options: [
      {
        id: 'opt_build_dream_house',
        label: 'Pagar a melhor empreiteira e transformar a casa em um palácio',
        description: 'Dar à sua rainha a dignidade que ela sempre mereceu.',
        effects: { money: -35000, composure: 25, coachTrust: 5, fanLove: 15 },
        resultText: 'O choro de alegria da sua mãe ao ver a cozinha nova e a suíte com banheira te deu uma paz de espírito inabalável para jogar bola.',
      },
      {
        id: 'opt_buy_apartment',
        label: 'Convencer ela a se mudar para um apartamento com elevador',
        description: 'Segurança e praticidade em um condomínio fechado.',
        effects: { money: -50000, composure: 15, coachTrust: 5 },
        resultText: 'Ela demorou a se acostumar com o porteiro, mas agora vive com toda a segurança e conforto do mundo.',
      },
    ],
  },
  {
    id: 'fisioterapeuta_particular',
    title: '💆 CONTRATAÇÃO DE FISIOTERAPEUTA PARTICULAR',
    tag: 'Carreira',
    description:
      'Para prolongar sua carreira e acelerar a recuperação muscular entre os jogos, um fisioterapeuta de ponta oferece acompanhamento diário por R$ 8.000 mensais.',
    options: [
      {
        id: 'opt_hire_physio',
        label: 'Contratar o profissional e montar estrutura de ponta em casa',
        description: 'Investimento puro no seu maior patrimônio: seu corpo.',
        effects: { money: -8000, energy: 25, composure: 10 },
        resultText: 'Suas dores musculares sumiram! Você recupera o fôlego em tempo recorde e seu índice de lesões caiu para quase zero.',
      },
      {
        id: 'opt_use_club_staff',
        label: 'Confiar apenas no departamento médico padrão do clube',
        description: 'Economizar a mensalidade e usar as instalações do CT.',
        effects: { energy: 0, money: 0 },
        resultText: 'O DM do clube atende a contento, embora as filas para a bota pneumática no pós-jogo sejam longas.',
      },
    ],
  },
  {
    id: 'supersticao_cueca_sorte',
    title: '🩲 A CUECA DA SORTE ESQUECIDA NO HOTEL',
    tag: 'Bastidores',
    description:
      'Você percebe no vestiário que esqueceu sua cueca/meia da sorte no hotel da concentração! Faltam 25 minutos para o clássico começar.',
    options: [
      {
        id: 'opt_send_uber_fetch',
        label: 'Pagar R$ 300 para um motoboy voar até o hotel e buscar',
        description: 'Sem a sua simpatia sagrada, a bola não entra de jeito nenhum!',
        effects: { money: -300, composure: 15, energy: -5 },
        resultText: 'O motoboy entregou o pacote no portão aos 45 do segundo tempo! Você vestiu seu amuleto e entrou no gramado com a mente blindada.',
      },
      {
        id: 'opt_play_without_it',
        label: '"Superstição é o escambau, meu talento é quem resolve!"',
        description: 'Quebrar o tabu e confiar unicamente no seu treino.',
        effects: { composure: 10, coachTrust: 5 },
        resultText: 'Você jogou solto e fez uma partida primorosa! A partir de hoje, você não depende mais de nenhuma crendice para brilhar.',
      },
    ],
  },
];

/**
 * Retorna um evento narrativo aleatório priorizando os inéditos (evita repetição)
 * @param {Array<string>} alreadySeenIds
 */
export function getRandomStoryEvent(alreadySeenIds = []) {
  const seenSet = new Set(alreadySeenIds || []);
  const available = STORY_EVENTS.filter((e) => !seenSet.has(e.id));
  
  // Se já esgotou todos os 52 eventos, reseta o ciclo para permitir novas rodadas
  if (available.length === 0) {
    return STORY_EVENTS[Math.floor(Math.random() * STORY_EVENTS.length)];
  }
  
  return available[Math.floor(Math.random() * available.length)];
}
