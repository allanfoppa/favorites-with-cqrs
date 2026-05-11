# Arquitetura Moderna Orientada para IA

Com a popularização dos LLMs e ferramentas como IA copilots, a forma de organizar software começa a impactar diretamente produtividade, custo computacional e qualidade das sugestões geradas pela IA.

Hoje não estamos mais otimizando arquitetura apenas para: humanos , compilador , runtime.

Também precisamos otimizar para: Agentes de IA.

---

## Como LLMs entendem código

LLMs não analisam o projeto inteiro automaticamente.

Eles recebem apenas:

- texto dentro da janela de contexto.

Isso significa que quanto mais indireções, abstrações e arquivos espalhados existirem:

- mais contexto precisa ser carregado,
- mais tokens são consumidos,
- mais difícil fica entender o fluxo completo.

---

## O Problema das Arquiteturas Muito Abstratas

Arquiteturas extremamente desacopladas normalmente geram:

- muitas camadas,
- interfaces,
- adapters,
- navegação excessiva,
- fluxo distribuído.

Exemplo:

```text
Controller
 -> Command
   -> Handler
      -> UseCase
         -> Port
            -> Adapter
               -> Repository
```

Isso pode ser excelente para desacoplamento extremo.

Mas para IA significa:

- mais arquivos no contexto,
- maior custo de tokens,
- mais dificuldade para rastrear fluxo,
- aumento da chance de inconsistências e hallucinations.

---

## Context Dilution

Quando o contexto enviado ao modelo fica grande demais, o LLM começa a perder foco semântico.

O modelo pode:

- esquecer detalhes,
- misturar conceitos,
- usar versões erradas de arquivos,
- perder consistência.

É como um humano tentando entender um sistema lendo 300 arquivos simultaneamente.

---

## Hallucination

Hallucination acontece quando o modelo inventa informações inexistentes.

Exemplos:

- métodos que não existem,
- APIs falsas,
- comportamento incorreto,
- arquivos inexistentes.

Context dilution frequentemente aumenta a chance de hallucination, porque o modelo começa a “preencher lacunas” probabilisticamente.

---

## Vertical Slice Architecture

Vertical Slice organiza o sistema por feature/use case, e não por camada técnica.

---

## Estrutura Tradicional

```text
controllers/
services/
repositories/
dtos/
```

O fluxo da feature fica espalhado pelo projeto.

---

## Estrutura Vertical Slice

```text
features/
  users/
    create-user/
      controller.ts
      service.ts
      repository.ts
      schema.ts
      test.ts
```

Tudo relacionado à feature `fica próximo`.

---

## Benefícios do Vertical Slice

### Para developers

- menor carga cognitiva,
- onboarding mais rápido,
- debugging simplificado,
- refactors mais seguros.

### Para IA

- menos tokens,
- menos contexto necessário,
- melhor entendimento semântico,
- menor chance de hallucination.

---

## Code Locality

Code Locality é o princípio de que:

> Código que muda junto deve ficar junto.

---

## Exemplo ruim

```text
shared/
  validators/

common/
  types/

users/
  services/
```

Uma alteração simples exige navegar por múltiplas pastas e domínios.

---

## Exemplo bom

```text
features/
  users/
    create-user/
      validator.ts
      types.ts
      service.ts
```

Tudo relacionado ao fluxo fica próximo semanticamente.

---

## O Problema do “Shared” Excessivo

Pastas como:

- shared,
- common,
- core,
- utils

tendem a crescer descontroladamente.

Consequências:

- dependências invisíveis,
- contexto confuso,
- maior acoplamento,
- dificuldade para IA identificar relevância.

---

## Hoje o mercado começa a favorecer:

- **feature-first** — Organização do projeto baseada em domínio/feature de negócio, e não por tipo técnico.
- **vertical slices** — Cada fluxo da aplicação contém tudo que precisa para funcionar, reduzindo navegação entre camadas.
- **baixa indireção** — Menos adapters, interfaces e abstrações desnecessárias para facilitar rastreabilidade do fluxo.
- **abstração pragmática** — Abstrair apenas quando existe necessidade real de reutilização ou desacoplamento.
- **code locality** — Código que muda junto deve ficar próximo fisicamente no projeto.
- **nomes explícitos** — Funções, arquivos e serviços devem deixar claro o que fazem sem exigir contexto adicional.
- **menos boilerplate** — Reduzir código repetitivo e estruturas excessivamente verbosas que aumentam complexidade sem agregar valor.

---

## Mantra

> “Prefer duplicated simplicity over shared complexity.”

Pequena duplicação muitas vezes é melhor que abstrações globais prematuras.

---

## Conclusão

O objetivo não é abandonar boas práticas consolidadas, mas reduzir: complexidade acidental, indireção excessiva navegação desnecessária e custo de contexto para humanos e IA.

Projetos com maior locality e menor fragmentação tendem a gerar melhores resultados com IA e geram mais produtividade, melhor entendimento, menor custo de tokens, maior eficiência para developers e agentes de IA.
