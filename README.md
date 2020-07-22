# Desafio Projeto BrewDog

Desafio realizado com framework Express, motor NodeJs e linguagem Javascript, implementando um CRUD de Usuários e acesso api BrewDog externa.

## **Configuração e Instalação!**
- Necessita configurar o banco na pasta:database, arquivo:database, nele contém toda configuração necessária.
- Criar Database no PostgreSql com nome: mytapp
- Precisar instalar Nodemon para funcionar ou apenas ajustar o arquivo package.json
- Instalar todas as depedencias
- Comando subir aplicação: npm start
- Api roda na porta 3000

## **EndPoints!**

**1. Index** get("/")

**2. Login Usuário:** get("/login")

**3. Registrar usuário:** get("/register")

**4. Index Usuário:** get("/api/user/index")

**5. Cadastrar Usuário:** post("/api/user/save")

**6. Atualizar Usuário:** post("/api/user/update")

**7. Buscar Usuário Especifico por Id:** post("/api/user/edit")

**8. Deletar Usuário:** post("/api/user/delete")

**9. Logar(Sair) o Usuário:** get("/api/user/logout")

**10. Buscar a lista e já listar no momento do Acesso:** post("/api/punk/index") e get("/api/punk/index")

## **Informações pelo email**
Qualquer dúvida, por favor, entre em contato com **[Leandro](mailto:leandro.cabeda@hotmail.com)**.
