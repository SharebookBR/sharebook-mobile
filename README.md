# PRIMEIROS PASSOS DEVELOPER MOBILE

## 1 - CONHEÇA O PROJETO SHAREBOOK

https://www.linkedin.com/pulse/projeto-sharebook-raffaello-damgaard/

## 2 - ENTRE NO SLACK

https://join.slack.com/t/sharebookworkspace/shared_invite/enQtMzQ2Nzc5OTk3MDc4LTZlMmJlMjA3NGE1NDczN2QxYzc2ZWZhM2UxMzFkMDIyYjliMGI3YzdlYzg2ZjZhYjQ2YWY1ZTUyZGViNzViOWQ

### 2.2 - LÁ NO SLACK, ENTRE NO CANAL #MOBILE

- Se apresente. Nome, cidade, profissão, e principais habilidades.
- Pergunte sobre as tarefas em aberto.
- Troque uma ideia com o time técnico. Comente como planeja solucionar. Ouça os conselhos dos devs mais experientes. Esse alinhamento é super importante pra aumentar significativamente as chances do seu PULL REQUEST ser aprovado depois.

## 3 - FAÇA PARTE DA EQUIPE NO TRELLO

https://trello.com/invite/sharebook6/928f21ef82592b5edafde06f171d338b

### 3.2 - PEGUE UMA TAREFA NO TRELLO.

- https://trello.com/b/uTc3JDOz/mobile
- Coloque no seu nome e mova para DOING.

## 4 - GITHUB

### 4.1 FAÇA UM FORK DO REPOSITÓRIO

https://github.com/SharebookBR/sharebook-mobile

### 4.2 ESCREVA CÓDIGO

Hora de colocar a mão na massa. A parte mais divertida, trabalhar no código-fonte. Depois de concluir e testar, envie e aguarde o PULL REQUEST ser aprovado.

### 5 MISSÃO CUMPRIDA. VC AJUDOU O PROJETO. ❤️

# Rodar o app pela primeira vez

```bash
# Verique se possui o Node instalado
# Caso não tenha, baixe a versão mais atual em (https://nodejs.org)
$ node -v

# Caso queira rodar em seu dispositivo ou emulador Android
$ npm install -g ionic cordova@8.1.1

# Instale os módulos
$ npm install

# Para rodar no browser
$ ionic serve

# Para rodar no emulador
$ ionic cordova emulate android # Adicione -l para livereload

# Para rodar no dispositivo Android
$ ionic cordova run android # Adicione -l para livereload

# Crie seu primeiro componente
$ ionic generate page NomeDoComponente
```

# Para fazer o build e publicar

No momento, temos scripts prontos para Ubuntu e OSx.

```bash
# Para gerar o apk versão release e production
$ make build

# Para assinar o apk assinado no Mac
$ make deploy-mac

# Para assinar o apk assinado no Ubuntu
$ make deploy-ubuntu
```

O apk será colocado na raíz do projeto.

Agora é só fazer o upload para a Play Store Console.

## API no ambiente de dev

http://dev.sharebook.com.br/swagger/

## Temporary fix

At line 241 of [this file](node_modules/@angular-devkit/build-optimizer/src/transforms/scrub-file.js#241) paste:
```
    // Workaround for missing metadata.
    if(!decorateArray.elements[1]) {
      return false;
    }
```
