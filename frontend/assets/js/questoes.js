// Banco de questões por área e nível
// nivel: "crianca" (6-12 anos) | "medio" (13-17 anos)
const QUESTOES = {
  biologia: {
    crianca: [
      { p: "Qual é o processo pelo qual as plantas fazem seu próprio alimento usando a luz do sol?", op: ["Respiração", "Fotossíntese", "Digestão", "Evaporação"], r: 1, exp: "As plantas usam a luz solar, água e gás carbônico para produzir açúcar — é a fotossíntese! 🌿" },
      { p: "Qual parte do corpo humano bombeia o sangue?", op: ["Pulmão", "Fígado", "Coração", "Rim"], r: 2, exp: "O coração é um músculo que bate mais de 100 mil vezes por dia! ❤️" },
      { p: "Qual desses animais é um mamífero?", op: ["Jacaré", "Sapo", "Baleia", "Avestruz"], r: 2, exp: "A baleia é mamífero! Ela respira ar e amamenta seus filhotes. 🐋" },
      { p: "Como se chama o processo de uma lagarta virar borboleta?", op: ["Hibernação", "Metamorfose", "Reprodução", "Migração"], r: 1, exp: "A metamorfose é a transformação completa que a lagarta faz dentro do casulo! 🦋" },
      { p: "Qual é o nome da célula básica de todos os seres vivos?", op: ["Átomo", "Molécula", "Célula", "Tecido"], r: 2, exp: "A célula é a unidade básica da vida! Somos feitos de trilhões delas. 🔬" },
    ],
    medio: [
      { p: "O que é a mitose?", op: ["Divisão celular que gera células com metade dos cromossomos", "Divisão celular que gera duas células geneticamente idênticas", "Processo de síntese de proteínas", "Transporte de substâncias pela membrana"], r: 1, exp: "A mitose gera duas células-filhas com o mesmo número de cromossomos da célula-mãe — usada no crescimento e regeneração. 🧬" },
      { p: "Qual organela é responsável pela respiração celular aeróbica?", op: ["Ribossomo", "Núcleo", "Mitocôndria", "Complexo de Golgi"], r: 2, exp: "A mitocôndria produz ATP através da respiração celular aeróbica — por isso é chamada de 'usina da célula'. ⚡" },
      { p: "O DNA é composto por quatro bases nitrogenadas. Quais são elas?", op: ["Adenina, Guanina, Citosina, Timina", "Adenina, Guanina, Citosina, Uracila", "Adenina, Glicina, Citosina, Timina", "Arginina, Guanina, Citosina, Timina"], r: 0, exp: "No DNA: Adenina (A), Timina (T), Guanina (G) e Citosina (C). No RNA, a Timina é substituída pela Uracila. 🧬" },
      { p: "O que é seleção natural segundo Darwin?", op: ["Organismos mais bonitos sobrevivem", "Organismos com características vantajosas deixam mais descendentes", "Todos os organismos evoluem igualmente", "A espécie mais forte come a mais fraca"], r: 1, exp: "Darwin propôs que indivíduos com características mais adaptadas ao ambiente se reproduzem mais, passando essas características adiante. 🦎" },
      { p: "Qual é a função dos ribossomos?", op: ["Produzir energia (ATP)", "Sintetizar proteínas", "Armazenar material genético", "Processar e secretar substâncias"], r: 1, exp: "Os ribossomos traduzem o RNA mensageiro em proteínas — são as 'fábricas de proteínas' da célula. 🏭" },
    ]
  },
  quimica: {
    crianca: [
      { p: "A água é formada por quais elementos?", op: ["Carbono e Oxigênio", "Hidrogênio e Oxigênio", "Nitrogênio e Hidrogênio", "Cloro e Sódio"], r: 1, exp: "A fórmula da água é H₂O — 2 átomos de Hidrogênio e 1 de Oxigênio! 💧" },
      { p: "O que acontece quando misturamos vinagre com bicarbonato de sódio?", op: ["Nada", "A mistura pega fogo", "Forma bolhas de gás", "A mistura congela"], r: 2, exp: "A reação libera CO₂ — o gás que forma as bolhas! É uma reação química ácido-base. ⚗️" },
      { p: "Qual é o estado físico do ferro à temperatura ambiente?", op: ["Gasoso", "Líquido", "Sólido", "Plasma"], r: 2, exp: "O ferro é sólido à temperatura ambiente. Para derreter, precisa de mais de 1500°C! 🔩" },
      { p: "Qual é o gás que os humanos expiramos ao respirar?", op: ["Oxigênio", "Nitrogênio", "Gás carbônico (CO₂)", "Hidrogênio"], r: 2, exp: "Inspiramos oxigênio e expiramos gás carbônico (CO₂) — produto da respiração celular. 🫁" },
      { p: "O que é uma mistura homogênea?", op: ["Uma mistura que pode ser separada facilmente", "Uma mistura em que as partes não se distinguem", "Uma mistura de sólidos apenas", "Uma mistura que muda de cor"], r: 1, exp: "Em uma mistura homogênea, como água com sal, não conseguimos distinguir as partes! 🧂" },
    ],
    medio: [
      { p: "Qual é o número atômico do carbono?", op: ["4", "6", "8", "12"], r: 1, exp: "O carbono tem número atômico 6 — ou seja, possui 6 prótons no núcleo. Sua massa atômica é 12. ⚛️" },
      { p: "O que é um mol em química?", op: ["6,02 × 10²³ partículas", "1 grama de qualquer substância", "O volume de 1 litro de gás", "A massa de um próton"], r: 0, exp: "Um mol é a quantidade de substância que contém 6,02 × 10²³ (número de Avogadro) entidades elementares. 🔢" },
      { p: "Qual ligação química ocorre entre metais e não-metais?", op: ["Covalente", "Metálica", "Iônica", "Dipolo-dipolo"], r: 2, exp: "A ligação iônica ocorre por transferência de elétrons, geralmente entre metais (que cedem) e não-metais (que recebem). 🧲" },
      { p: "O que mede o pH?", op: ["A temperatura de uma solução", "A concentração de íons H⁺", "A quantidade de sal dissolvido", "A pressão osmótica"], r: 1, exp: "pH mede a concentração de íons H⁺. Abaixo de 7 é ácido, igual a 7 é neutro, acima de 7 é básico. 🧪" },
      { p: "Na tabela periódica, os elementos de uma mesma família (coluna) têm em comum:", op: ["Mesmo número de nêutrons", "Mesma massa atômica", "Mesmo número de elétrons na camada de valência", "Mesmo estado físico"], r: 2, exp: "Elementos da mesma família têm o mesmo número de elétrons na última camada, o que lhes confere propriedades químicas semelhantes. ⚗️" },
    ]
  },
  fisica: {
    crianca: [
      { p: "O que é a gravidade?", op: ["Uma cor de luz", "A força que atrai os corpos para a Terra", "O calor do Sol", "O som no espaço"], r: 1, exp: "A gravidade é a força que nos mantém no chão e faz os objetos caírem quando os soltamos! 🍎" },
      { p: "Qual é a velocidade da luz no vácuo, aproximadamente?", op: ["300 km/h", "300 mil km/h", "300 mil km/s", "3 mil km/s"], r: 2, exp: "A luz viaja a incríveis 300.000 km por SEGUNDO — tão rápido que em 1 segundo volta à Terra 7,5 vezes! 💡" },
      { p: "O que acontece com o som em comparação à luz?", op: ["O som viaja mais rápido que a luz", "O som viaja mais devagar que a luz", "Eles viajam na mesma velocidade", "O som não viaja"], r: 1, exp: "É por isso que você vê o raio antes de ouvir o trovão — a luz chega muito mais rápido! ⚡" },
      { p: "Qual é a unidade de medida de temperatura no Sistema Internacional?", op: ["Celsius", "Fahrenheit", "Kelvin", "Rankine"], r: 2, exp: "O Kelvin (K) é a unidade SI de temperatura. 0 K é o zero absoluto — a temperatura mais fria possível! 🌡️" },
      { p: "O que é energia cinética?", op: ["Energia armazenada num objeto parado", "Energia de um objeto em movimento", "Energia do calor", "Energia da luz"], r: 1, exp: "Energia cinética é a energia que um objeto possui por estar em movimento! Quanto mais rápido, maior a energia. 🚀" },
    ],
    medio: [
      { p: "Qual é a Segunda Lei de Newton?", op: ["A cada ação há uma reação igual e oposta", "Um corpo em repouso tende a permanecer em repouso", "F = m × a (Força = massa × aceleração)", "A energia se conserva em um sistema isolado"], r: 2, exp: "F = ma é a Segunda Lei de Newton: a força resultante é igual ao produto da massa pela aceleração. 📐" },
      { p: "O que é resistência elétrica e qual sua unidade?", op: ["Oposição ao fluxo de corrente, medida em Ohm (Ω)", "A quantidade de elétrons, medida em Ampere (A)", "A diferença de potencial, medida em Volt (V)", "A potência elétrica, medida em Watt (W)"], r: 0, exp: "Resistência (R) é a oposição ao fluxo de corrente elétrica, medida em Ohms (Ω). Lei de Ohm: V = R × I. ⚡" },
      { p: "O que é o Princípio da Conservação de Energia?", op: ["A energia pode ser criada a partir do nada", "A energia total de um sistema isolado permanece constante", "A energia sempre se transforma em calor", "Energia e massa são grandezas independentes"], r: 1, exp: "A energia não é criada nem destruída — apenas transformada! É o Primeiro Princípio da Termodinâmica. 🔋" },
      { p: "O que descreve a Equação de Einstein E = mc²?", op: ["Relação entre força e aceleração", "Equivalência entre energia e massa", "A velocidade da luz ao quadrado", "A energia cinética de um fóton"], r: 1, exp: "E = mc² mostra que massa e energia são equivalentes. Uma pequena massa equivale a uma enorme quantidade de energia! ☢️" },
      { p: "O que é o fenômeno de refração da luz?", op: ["A luz voltando ao mesmo meio", "A luz sendo absorvida por um material", "A mudança na velocidade e direção da luz ao mudar de meio", "A decomposição da luz em cores"], r: 2, exp: "A refração ocorre quando a luz muda de meio (ex: ar para água) e sua velocidade muda, desviando a trajetória. É por isso que um canudo parece dobrado na água! 🌊" },
    ]
  },
  astronomia: {
    crianca: [
      { p: "Quantos planetas existem no nosso Sistema Solar?", op: ["7", "8", "9", "10"], r: 1, exp: "São 8 planetas: Mercúrio, Vênus, Terra, Marte, Júpiter, Saturno, Urano e Netuno. Plutão foi reclassificado em 2006! 🪐" },
      { p: "Qual é o maior planeta do Sistema Solar?", op: ["Saturno", "Netuno", "Júpiter", "Urano"], r: 2, exp: "Júpiter é tão grande que caberia mais de 1.300 Terras dentro dele! 🪐" },
      { p: "O que é uma estrela cadente?", op: ["Uma estrela que está morrendo", "Um cometa passando", "Um meteoroide queimando na atmosfera", "Um satélite caindo"], r: 2, exp: "Estrelas cadentes são meteoroides — pedaços de rocha — que entram na atmosfera e pegam fogo! ✨" },
      { p: "Quanto tempo a luz do Sol leva para chegar à Terra?", op: ["Alguns segundos", "Cerca de 8 minutos", "1 hora", "1 dia"], r: 1, exp: "A luz do Sol leva cerca de 8 minutos e 20 segundos para chegar até nós — mesmo viajando a 300.000 km/s! ☀️" },
      { p: "O que é a Lua?", op: ["Um planeta pequeno", "Uma estrela próxima", "O satélite natural da Terra", "Um asteroide"], r: 2, exp: "A Lua é o satélite natural da Terra! Ela influencia as marés e orbita a Terra em cerca de 27 dias. 🌕" },
    ],
    medio: [
      { p: "O que é um buraco negro?", op: ["Uma região sem matéria no espaço", "Um objeto com gravidade tão intensa que nem a luz escapa", "Uma estrela que explodiu completamente", "Um vazio entre galáxias"], r: 1, exp: "Buracos negros têm gravidade tão extrema que a velocidade de escape supera a da luz — por isso nem a luz consegue escapar! 🕳️" },
      { p: "O que é o Big Bang?", op: ["Uma grande explosão nuclear no espaço", "A teoria sobre a origem e expansão do universo", "A colisão de duas galáxias", "O fim do universo previsto pela ciência"], r: 1, exp: "O Big Bang descreve como o universo começou de um estado extremamente quente e denso, há cerca de 13,8 bilhões de anos, e continua em expansão. 🌌" },
      { p: "O que é um ano-luz?", op: ["O tempo que a Terra leva para orbitar o Sol", "A distância que a luz percorre em um ano", "A quantidade de luz emitida pelo Sol por ano", "A medida de brilho de uma estrela"], r: 1, exp: "Um ano-luz é a distância percorrida pela luz em um ano — aproximadamente 9,46 × 10¹² km! Serve para medir distâncias astronômicas. 🌟" },
      { p: "Como as estrelas de massa parecida com o Sol terminam suas vidas?", op: ["Como supernova", "Como buraco negro", "Como anã branca", "Como pulsar"], r: 2, exp: "Estrelas como o Sol expandem para gigante vermelha e depois expelem suas camadas externas, formando uma nebulosa planetária e deixando uma anã branca no centro. 🌠" },
      { p: "O que é a Via Láctea?", op: ["Um sistema planetário", "A galáxia onde está o Sistema Solar", "Uma nebulosa próxima da Terra", "Um aglomerado de estrelas fora de qualquer galáxia"], r: 1, exp: "A Via Láctea é a galáxia espiral barrada onde vivemos. Tem mais de 200 bilhões de estrelas e cerca de 100 mil anos-luz de diâmetro! 🌌" },
    ]
  },
  matematica: {
    crianca: [
      { p: "Quanto é 7 × 8?", op: ["54", "56", "58", "48"], r: 1, exp: "7 × 8 = 56! Uma dica: 7 × 8 = 7 × 4 × 2 = 28 × 2 = 56 ✨" },
      { p: "Um triângulo equilátero tem todos os lados...", op: ["Diferentes", "Dois lados iguais", "Iguais", "Nenhum lado igual"], r: 2, exp: "Equilátero vem do latim 'aequus latus' = lados iguais! Os 3 lados têm o mesmo comprimento. 📐" },
      { p: "Qual é o resultado de 1/2 + 1/4?", op: ["2/6", "2/8", "3/4", "1/3"], r: 2, exp: "1/2 = 2/4, então 2/4 + 1/4 = 3/4! Para somar frações, deixamos o denominador igual. 🍕" },
      { p: "Quantos graus tem um ângulo reto?", op: ["45°", "60°", "90°", "180°"], r: 2, exp: "Um ângulo reto tem exatamente 90°! É o ângulo dos cantos de um quadrado. 📏" },
      { p: "Qual é o próximo número na sequência: 2, 4, 8, 16, ...?", op: ["20", "24", "30", "32"], r: 3, exp: "Cada número é o dobro do anterior: 16 × 2 = 32! É uma progressão geométrica de razão 2. 🔢" },
    ],
    medio: [
      { p: "Qual é o valor de sen(30°)?", op: ["√3/2", "1/2", "√2/2", "1"], r: 1, exp: "sen(30°) = 1/2. No triângulo 30-60-90, o cateto oposto a 30° é a metade da hipotenusa. 📐" },
      { p: "O que é a derivada de f(x) = x³?", op: ["x²", "3x", "3x²", "x⁴/4"], r: 2, exp: "A regra da potência diz: se f(x) = xⁿ, então f'(x) = n·xⁿ⁻¹. Logo, a derivada de x³ é 3x². 📈" },
      { p: "Qual é a fórmula da área de um círculo?", op: ["2πr", "πr²", "πd", "4πr²"], r: 1, exp: "A área do círculo é A = πr², onde r é o raio. A circunferência (perímetro) é C = 2πr. ⭕" },
      { p: "Em uma PA (Progressão Aritmética), qual é o termo geral?", op: ["aₙ = a₁ · rⁿ⁻¹", "aₙ = a₁ + (n-1)·r", "aₙ = a₁ · n", "aₙ = (a₁ + aₙ)/2"], r: 1, exp: "Na PA, cada termo é obtido somando a razão r ao anterior. O termo geral é aₙ = a₁ + (n−1)·r. 🔢" },
      { p: "Qual é o conjunto solução de x² - 5x + 6 = 0?", op: ["{2, 4}", "{-2, -3}", "{2, 3}", "{1, 6}"], r: 2, exp: "Fatorando: (x−2)(x−3) = 0, logo x = 2 ou x = 3. Verificando: 4−10+6=0 ✓ e 9−15+6=0 ✓" },
    ]
  },
  tecnologia: {
    crianca: [
      { p: "O que significa 'WWW' na internet?", op: ["World Wide Web", "World Wire Web", "World Web Wide", "Wide World Web"], r: 0, exp: "WWW = World Wide Web, a 'teia mundial' — o sistema de páginas e sites que acessamos pela internet! 🌐" },
      { p: "O que faz a tecla 'Delete' no computador?", op: ["Salva o arquivo", "Apaga o que está à direita do cursor", "Desfaz uma ação", "Abre um programa"], r: 1, exp: "A tecla Delete apaga o caractere à direita do cursor. Já o Backspace apaga o caractere à esquerda! 💻" },
      { p: "Para que serve um algoritmo?", op: ["Para conectar à internet", "Para guardar arquivos", "Para dar instruções passo a passo a um computador", "Para acelerar o processador"], r: 2, exp: "Um algoritmo é uma sequência lógica de passos para resolver um problema — como uma receita para o computador! 🤖" },
      { p: "O que é um pixel?", op: ["Um tipo de vírus", "A menor unidade de uma imagem digital", "Um tipo de cabo de rede", "Um programa de edição de fotos"], r: 1, exp: "Pixel vem de 'picture element' — é o menor ponto de uma imagem digital. Uma foto tem milhões deles! 🖼️" },
      { p: "O que significa 'GB' em armazenamento?", op: ["Giga Bit", "Giga Byte", "Giga Banco", "Grande Byte"], r: 1, exp: "GB = Gigabyte. 1 GB = 1.024 MB = 1.073.741.824 bytes! Serve para medir a capacidade de memória. 💾" },
    ],
    medio: [
      { p: "O que é uma linguagem de programação compilada?", op: ["É traduzida linha por linha durante a execução", "É convertida para código de máquina antes da execução", "Funciona apenas em navegadores web", "Não requer processador para executar"], r: 1, exp: "Linguagens compiladas (ex: C, C++) convertem todo o código para linguagem de máquina antes de rodar — geralmente mais rápidas. 💻" },
      { p: "O que é um protocolo HTTP?", op: ["Um programa de segurança", "Um conjunto de regras para transferência de dados na web", "O sistema de roteamento da internet", "Um tipo de banco de dados"], r: 1, exp: "HTTP (HyperText Transfer Protocol) define como clientes e servidores web trocam informações. O HTTPS é a versão segura com criptografia. 🌐" },
      { p: "O que é Inteligência Artificial?", op: ["Robôs que substituem humanos", "Sistemas que simulam capacidades cognitivas humanas em máquinas", "Programas que conectam computadores em rede", "Antivírus avançados"], r: 1, exp: "IA é o campo da computação que desenvolve sistemas capazes de aprender, raciocinar e resolver problemas — como você está fazendo agora no quiz! 🤖" },
      { p: "O que é recursão em programação?", op: ["Um loop que nunca para", "Quando uma função chama a si mesma", "Um tipo de banco de dados", "O processo de compilar código"], r: 1, exp: "Recursão é quando uma função resolve um problema chamando a si mesma com uma versão menor do problema. Ex: cálculo de fatorial. 🔄" },
      { p: "O que é complexidade de algoritmo Big O(n)?", op: ["O tempo de compilação", "A quantidade de memória RAM usada", "A taxa de crescimento do tempo/espaço em função da entrada", "A velocidade de processamento em GHz"], r: 2, exp: "Big O descreve como o tempo ou espaço de um algoritmo cresce em relação ao tamanho da entrada. O(n) = cresce linearmente. ⏱️" },
    ]
  }
};

const AREAS = [
  { id: "biologia",    nome: "Biologia",    emoji: "🧬", cor: "#10B981" },
  { id: "quimica",     nome: "Química",     emoji: "⚗️", cor: "#F59E0B" },
  { id: "fisica",      nome: "Física",      emoji: "⚡", cor: "#6C3EF0" },
  { id: "astronomia",  nome: "Astronomia",  emoji: "🔭", cor: "#06B6D4" },
  { id: "matematica",  nome: "Matemática",  emoji: "📐", cor: "#EC4899" },
  { id: "tecnologia",  nome: "Tecnologia",  emoji: "💻", cor: "#F97316" },
];
