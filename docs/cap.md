# CAP Theorem

É um conceito muito importante em sistemas distribuídos, bancos de dados e microservices.

Ele tenta responder uma pergunta:

> “Quando vários servidores trabalham juntos e existe falha de rede, o que o sistema deve PRIORIZAR?”

O nome CAP vem de:

- **C → Consistency (Consistência)**
- **A → Availability (Disponibilidade)**
- **P → Partition Tolerance (Tolerância à Partição)**

---

Primeiro: o que é um sistema distribuído?

Imagine o cenário:

- um banco em São Paulo
- outro em Porto Alegre
- outro em Nova York

Todos precisam trocar informações entre si.

Isso é um **sistema distribuído**.

O problema começa quando:

- a internet falha
- um servidor cai
- a comunicação fica lenta
- um nó não consegue falar com outro

É aí que o CAP entra.

---

## O Teorema CAP:

Em um sistema distribuído, P (Partition Tolerance) não é uma escolha, é uma necessidade. Você não pode simplesmente "escolher não ter falhas de rede". A rede vai falhar.

Portanto, o teorema CAP não é sobre escolher dois. É sobre: "Quando houver uma partição (P), você prefere Consistência (C) ou Disponibilidade (A)?".

---

## Vamos entender cada parte

### C → Consistency (Consistência)

Todos os servidores mostram exatamente o mesmo dado.

Exemplo:

Você tem R$10 na conta.

saca R$5:

- TODOS os servidores precisam mostrar R$5 imediatamente.

Nenhum pode mostrar valor antigo. em caso de erro na partição talvez o sistema precise bloquear operações, e informar o usuário para tentar mais tarde novamente.

---

### A → Availability (Disponibilidade)

O sistema sempre responde. Mesmo com falhas.

Exemplo:

O usuário faz uma requisição para um post:

- O post retornou com 1000 curtidas.
- Na realidade são 1001, mas, ainda não houve a sincronização.

Mesmo sendo desatualizada, é uma informação que não impede o sistema de seguir e não barrar novas operações do usuário.

### P → Partition Tolerance (Tolerância à Partição)

O sistema continua funcionando mesmo quando os servidores não conseguem se comunicar.

Exemplo:

Servidor A não consegue falar com Servidor B.

Mesmo assim:

- o sistema continua operando.

---

## RESUMO

Em sistemas modernos:

- falhas de rede acontecem SEMPRE.

Por isso:

- praticamente todo sistema distribuído precisa de P.

Então na prática:

- a escolha real normalmente é entre:
  - CP
  - AP

---

## Escolhendo CP (Consistency + Partition Tolerance)

O sistema prefere consistência.

Então:

- algumas operações podem ser bloqueadas
- talvez o sistema diga:
  - “Tente novamente mais tarde”

Mas:

- nunca retorna dado incorreto.

---

## Escolhendo AP (Availability + Partition Tolerance)

O sistema prefere disponibilidade.

Então:

- continua respondendo
- aceita operações

Mas:

- talvez os dados fiquem temporariamente inconsistentes.

Depois sincroniza.

## O que é “Eventually Consistent”?

Muito comum em sistemas AP.

Significa:

> “Os dados podem ficar inconsistentes temporariamente, mas eventualmente ficarão corretos.”

Exemplo:

- você curte um post
- outro usuário ainda vê 10 likes
- alguns segundos depois vê 11

---

## Analogia simples

Imagine um grupo de amigos anotando pontos de um jogo.

---

### Consistency

Todos precisam ter exatamente a mesma pontuação antes de continuar.

Mais seguro.
Mais lento.

---

### Availability

Cada um continua anotando mesmo sem confirmar com os outros.

Mais rápido.
Pode gerar divergência temporária.

---

## Exemplo CQRS + Eventual Consistency

No meu estudo de CQRS, eu apliquei da seguinte maneira.

Fluxo:

1. Usuário cria favorito
2. Write DB salva
3. Evento é publicado
4. Read DB atualiza depois

Durante alguns milissegundos:

- o favorito existe no write
- mas ainda não apareceu no read

Isso é:

- AP
- eventual consistency

---

## Se pergunte:

“Se esse dado atrasar alguns segundos, tudo bem?”

### Se NÃO

#### CP

“Prefiro parar do que retornar dado errado.”

Exemplo:

- pagamentos
- estoque
- saldo bancário

---

### Se SIM

#### AP

“Prefiro continuar funcionando mesmo com atraso nos dados.”

Exemplo:

- likes
- feeds
- analytics
- dashboards
