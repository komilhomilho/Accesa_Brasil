db.link.insertMany([
    {
        name: "Calendário de Vacinação",
        description: "",
        url: "https://www.gov.br/saude/pt-br/vacinacao/calendario",
        tags: ["vacinação", "informativo", "saúde"]
    },
    {
        name: "Bilhete SPTrans para PCDs",
        description: "",
        url: "https://bilheteunico.sptrans.com.br/especial/pessoa-com-deficiencia/",
        tags: ["pcd", "transporte", "deficiência", "bilhete unico", "mobilidade"]
    },
    {
        name: "Solicitar Benefício Assistencial à Pessoa com Deficiência",
        description: "",
        url: "https://www.gov.br/pt-br/servicos/solicitar-beneficio-assistencial-a-pessoa-com-deficiencia",
        tags: ["auxílio", "pcd", "deficiência", "assistência", "solicitação"]
    },
    {
        name: "CadÚnico",
        description: "",
        url: "https://cadunico.dataprev.gov.br/#/programas-sociai",
        tags: ["cadastro", "auxílio", "baixa renda", "programa social"]
    },
    {
        name: "Agendamento UBS",
        description: "",
        url: "https://agendafacil.prefeitura.sp.gov.br/saude",
        tags: ["saúde", "agendar"]
    }
].map(doc => ({
    ...doc,
    lastUpdated: new Date()
})));
