# Teorema PACELC

É uma extensão do Teorema CAP para sistemas distribuídos. Ele foi proposto por **Daniel J. Abadi** em 2012 para analisar os _trade-offs_ de desempenho quando o sistema está saudável, e não apenas quando está falhando.

Enquanto o CAP foca apenas no que acontece durante uma falha, o PACELC tenta responder: _"O que acontece com a performance do sistema no estado normal (99% do tempo)?"_.

---

## Entendendo os pilares:

- **P (Partition):** Durante uma falha na rede, o sistema deve escolher entre Disponibilidade ou Consistência (a parte clássica do CAP).
- **E (Else):** Quando o sistema está operando normalmente (sem falhas), ele ainda enfrenta um dilema: priorizar a velocidade de resposta ou a precisão absoluta dos dados.
- **Trade-off de Latência:**
  - Para garantir **Consistência Forte (C)**, é necessário aumentar a **Latência (L)**, pois o sistema precisa de tempo para replicar e confirmar os dados em todos os nós antes de responder ao usuário.

---

## Exemplos de Implementação

| Modelo    | Comportamento                                                                                                                       | Exemplos Reais                                                       |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **PA/EL** | Prioriza disponibilidade durante falhas e baixíssima latência em operação normal (consistência eventual).                           | DynamoDB, Cassandra, Couchbase                                       |
| **PC/EC** | Prioriza consistência em ambos os cenários (falha ou funcionamento normal), aceitando uma latência maior para garantir integridade. | Google Spanner, MongoDB (configurado para consistência), Bancos ACID |

---

## No dia a dia?

A escolha deve ser baseada na natureza do dado:

### 1. Escolha PA/EL

**Cenário:** Sistemas de notificações, feeds de redes sociais ou analytics.

- **Na falha (P):** O usuário continua vendo o feed (**A**), mesmo que desatualizado.
- **Operação normal (E):** O feed carrega instantaneamente (**L**), mesmo que um post demore 500ms para aparecer sincronizado para todos os outros usuários.

### 2. Escolha PC/EC

**Cenário:** Sistemas de reserva de assentos, transações financeiras ou controle de estoque.

- **Na falha (P):** Você prefere retornar um erro (**C**) do que correr o risco de vender o mesmo item para duas pessoas diferentes.
- **Operação normal (E):** O usuário espera o tempo que for necessário (**L**) para que o sistema confirme que a transação foi replicada com segurança em todos os nós antes de dar o "OK" final.

---

> **Resumo:** O PACELC nos ensina que a arquitetura não é apenas sobre lidar com desastres, mas sobre entender como a consistência afeta o tempo de resposta (latência) do sistema no cotidiano.
