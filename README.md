#__Kruger Controle Suprimentos__

##__Objetivo__
-Criar um aplicativo para auxiliar o controle de itens que faltam ou que estão prestes de acabar no estoque da loja, diminuindo o conflito e múltiplos meios de avisos

##__Features__
-Login único para cada usuário do sistema
-CRUD de marcas
-CRUD de produtos
-Dashboard inteligente para o controle de possíveis furos do estoque
-Filtros de produtos por marca, vendedor, já pedido e etc...
-Controle de último preço pago pelo produto
-Interface responsiva desktop/mobile

##__Stack atual do projeto__
-FrontEnd: EJS (Embedded JavaScript)
-BackEnd: Express.js
-Database: postgreSQL


##__Como executar o projeto__
-Clone o reposiório GIT

-Crie um .env com as variáveis do seu postgres

-Certifique-se de adicionar *{force: true}* __na primeira execução__ da sincronização da database em *app.js*
<img width="420" height="62" alt="image" src="https://github.com/user-attachments/assets/ee933c13-ee7c-475f-891c-8cdd4ffc68a2" />

-Crie a tabela de sessão no banco 
```sql
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
```
-No  diretório do projeto rode
```cmd
npm install
npm start
```

##__Próximas Atualizações__
-Adicionar feature de vendedores
-atualizar o frontend para react/angular

##__acretito que seje isso, muito obrigado por visualizar meu projeto <3__





