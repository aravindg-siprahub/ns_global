/**
 * Career tracks for the Profile Builder.
 * ─────────────────────────────────────────────────────────────
 * Every piece of generated text, skill list and checklist is driven by
 * this file. To add a new role, add one entry to `roles` below — nothing
 * else needs to change.
 */

export type Skill = { name: string; re: RegExp; trending?: boolean };

export type Role = {
  id: string;
  /** Short name used on chips and tabs */
  label: string;
  /** Matching course on /services/[slug] */
  course: string;
  logo: string;
  /** Main job title used in headlines, e.g. "Snowflake Data Engineer" */
  title: string;
  /** Alternate wording for the "swap daily" Naukri headline */
  titleAlt: string;
  /** Role name used for projects and the Naukri career profile */
  projectRole: string;
  /** Titles for LinkedIn "Open to work" and target roles */
  jobTitles: string[];
  /** What the course is called in the announcement post */
  training: string;
  /** Domain words, e.g. "data engineering" */
  field: string;
  /** "Experienced (already in …)" */
  expLabel: string;
  /** Resume lines that show the person already works in this field */
  backgroundRe: RegExp;
  skills: Skill[];
  defaults: string[];
  keySkillsExtra: string[];
  itSkills: string;
  pinSkills: string;
  intro: { fresher: string; switch: string; exp: string };
  core: string;
  headlineTag: { fresher: string; switch: string; exp: string };
  liTag: { fresher: string; exp: string };
  enjoys: string;
  highlight: { label: string; items: string[] };
  responsibilities: string[];
  learnings: [string, string, string];
  hashtags: string[];
  emoji: string;
  team: string;
  topic: string;
  learnTip: string;
  banner: string;
  fileName: string;
  projectRe: RegExp;
  certRe: RegExp;
  examples: { current: string; cert: string; other: string; p1: string; p2: string };
};

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s*');
/** Skill whose name is matched as a whole word unless a custom pattern is given */
const sk = (name: string, re?: RegExp, trending = false): Skill => ({
  name,
  re: re ?? new RegExp(`(^|[^a-z0-9+#])${esc(name)}($|[^a-z0-9+#])`, 'i'),
  trending,
});
const hot = (name: string, re?: RegExp) => sk(name, re, true);

export const roles: Role[] = [
  {
    id: 'snowflake',
    label: 'Snowflake',
    course: 'snowflake',
    logo: '/logos/snowflake.svg',
    title: 'Snowflake Data Engineer',
    titleAlt: 'Data Engineer (Snowflake)',
    projectRole: 'Data Engineer',
    jobTitles: ['Data Engineer', 'Snowflake Developer', 'ETL Developer'],
    training: 'Snowflake Data Engineering',
    field: 'data engineering',
    expLabel: 'data / ETL / BI',
    backgroundRe: /data engineer|etl developer|bi developer|snowflake developer|data analyst|informatica/i,
    skills: [
      sk('Snowflake', /snowflake/i), sk('SQL', /\bsql\b/i), sk('Python', /python/i), sk('Snowpipe', /snowpipe/i),
      sk('Streams & Tasks', /\bstreams?\b.*\btasks?\b|\btasks?\b.*\bstreams?\b/i), sk('Time Travel', /time[\s-]?travel/i),
      sk('Zero-Copy Cloning', /zero[\s-]?copy|clon(e|ing)/i), sk('Data Sharing', /data[\s-]?shar(e|ing)|secure share/i),
      sk('Snowpark', /snowpark/i), hot('Dynamic Tables', /dynamic tables?/i), hot('Snowflake Cortex AI', /cortex/i),
      hot('Apache Iceberg', /iceberg/i), sk('dbt', /\bdbt\b/i), sk('Airflow', /airflow/i), sk('AWS S3', /\baws\b|\bs3\b/i),
      sk('Azure Data Factory', /azure data factory|\badf\b/i), sk('ETL / ELT', /\betl\b|\belt\b/i),
      sk('Data Modeling', /data model(l)?ing|star schema|dimensional/i), sk('Data Warehousing', /data ?warehous/i),
      sk('Performance Tuning', /performance tuning|query optimi[sz]/i), sk('RBAC / Security', /\brbac\b|role[\s-]based access/i),
      sk('Git', /\bgit(hub|lab)?\b/i), sk('Power BI', /power ?bi/i), sk('Tableau', /tableau/i), sk('PySpark', /pyspark|\bspark\b/i),
    ],
    defaults: ['Snowflake', 'SQL', 'Python', 'Snowpipe', 'Streams & Tasks', 'Time Travel', 'ETL / ELT', 'Data Warehousing'],
    keySkillsExtra: ['Data Engineering', 'Cloud Data Warehouse'],
    itSkills: 'Snowflake, SQL and Python',
    pinSkills: 'Snowflake, SQL, Data Engineering',
    intro: {
      fresher: 'Data engineering professional trained in Snowflake and modern cloud data warehousing, with hands-on project experience building end-to-end data pipelines.',
      switch: 'now specialised in Snowflake data engineering through structured training and hands-on projects.',
      exp: 'designing and building data pipelines and warehouses on Snowflake.',
    },
    core: 'Experienced in loading data with Snowpipe, automating incremental processing with Streams & Tasks, writing optimised SQL, and applying Snowflake features such as Time Travel, Zero-Copy Cloning and role-based access control.',
    headlineTag: { fresher: 'Hands-on ETL/ELT pipeline projects', switch: 'Data pipelines & warehousing', exp: 'Building scalable ELT pipelines' },
    liTag: { fresher: 'ETL/ELT Pipelines', exp: 'Building reliable data pipelines' },
    enjoys: 'I enjoy turning raw data into clean, reliable datasets that teams can trust.',
    highlight: { label: 'Snowflake', items: ['Snowpipe', 'Streams & Tasks', 'Time Travel', 'Zero-Copy Cloning', 'RBAC'] },
    responsibilities: [
      'Designed the data model and Snowflake objects (databases, schemas, stages, tables)',
      'Built ingestion using Snowpipe / COPY INTO from cloud storage',
      'Implemented incremental loads with Streams & Tasks and transformations in SQL',
      'Tuned queries and warehouse sizing for cost and performance',
    ],
    learnings: ['Loading data automatically with Snowpipe', 'Incremental processing with Streams & Tasks', 'Recovering data with Time Travel and cloning environments in seconds'],
    hashtags: ['Snowflake', 'DataEngineering', 'SQL', 'ETL'],
    emoji: '❄️',
    team: 'data teams',
    topic: 'Snowflake / data engineering',
    learnTip: 'a Snowflake feature, a SQL tip, a project update',
    banner: 'data / Snowflake themed',
    fileName: 'Snowflake_Data_Engineer',
    projectRe: /(pipeline|built|developed|designed|migrat|implemented|automated|loaded|ingest)/i,
    certRe: /snowpro|snowflake/i,
    examples: {
      current: 'e.g. Support Engineer at TCS',
      cert: 'e.g. SnowPro Core Certification',
      other: 'e.g. Informatica, Power BI',
      p1: 'e.g. Built an end-to-end retail sales pipeline: S3 → Snowpipe → Streams & Tasks → dbt models → Power BI dashboard',
      p2: 'e.g. Migrated on-prem SQL Server tables to Snowflake with incremental loads and Time Travel based recovery',
    },
  },
  {
    id: 'informatica',
    label: 'Informatica',
    course: 'informatica',
    logo: '/logos/informatica.svg',
    title: 'Informatica ETL Developer',
    titleAlt: 'ETL Developer (Informatica)',
    projectRole: 'ETL Developer',
    jobTitles: ['ETL Developer', 'Informatica Developer', 'Data Integration Engineer'],
    training: 'Informatica ETL Development',
    field: 'data integration',
    expLabel: 'ETL / data / BI',
    backgroundRe: /etl developer|informatica|data engineer|bi developer|data warehouse|datastage|ssis|talend/i,
    skills: [
      sk('Informatica PowerCenter', /powercenter|informatica/i), hot('Informatica IDMC', /\bidmc\b|intelligent data management cloud/i),
      hot('Cloud Data Integration (IICS)', /\biics\b|\bcdi\b|cloud data integration|informatica cloud/i), hot('CLAIRE AI', /claire/i),
      sk('SQL', /\bsql\b/i), sk('PL/SQL', /pl\s*\/?\s*sql/i), sk('Oracle', /oracle/i), sk('SQL Server', /sql server|mssql/i),
      sk('Mappings & Workflows', /mapping|workflow|mapplet|session/i), sk('SCD Type 1 / 2', /\bscd\b|slowly changing/i),
      sk('Performance Tuning', /performance tuning|pushdown|partition/i), sk('Data Quality', /data quality|\bidq\b/i),
      sk('Unix / Shell Scripting', /unix|shell script|\bbash\b/i), sk('Data Warehousing', /data ?warehous/i),
      sk('ETL Testing', /etl testing/i), sk('Scheduling (Control-M / Autosys)', /control[\s-]?m|autosys|tidal/i),
      hot('Snowflake', /snowflake/i), sk('AWS / Azure', /\baws\b|azure/i), hot('Python', /python/i), sk('Git', /\bgit(hub|lab)?\b/i),
    ],
    defaults: ['Informatica PowerCenter', 'Cloud Data Integration (IICS)', 'SQL', 'PL/SQL', 'Oracle', 'Mappings & Workflows', 'SCD Type 1 / 2', 'Data Warehousing'],
    keySkillsExtra: ['ETL Development', 'Data Integration'],
    itSkills: 'Informatica PowerCenter, IICS and SQL',
    pinSkills: 'Informatica, ETL, SQL',
    intro: {
      fresher: 'ETL professional trained in Informatica PowerCenter and Informatica Cloud (IDMC), with hands-on project experience building data integration workflows.',
      switch: 'now specialised in Informatica ETL development through structured training and hands-on projects.',
      exp: 'designing and building ETL workflows and data integration solutions with Informatica.',
    },
    core: 'Experienced in building mappings, sessions and workflows, implementing SCD Type 1/2 loads, writing optimised SQL and PL/SQL, and tuning ETL jobs with partitioning and pushdown optimisation.',
    headlineTag: { fresher: 'Hands-on ETL workflow projects', switch: 'ETL & data integration', exp: 'Building reliable ETL pipelines' },
    liTag: { fresher: 'ETL & Data Integration', exp: 'Building reliable data integration' },
    enjoys: 'I enjoy connecting systems and moving data accurately so every report starts from the right numbers.',
    highlight: { label: 'Informatica', items: ['PowerCenter', 'IICS / IDMC', 'Mappings & Workflows', 'SCD Type 1 / 2'] },
    responsibilities: [
      'Analysed source systems and wrote the source-to-target mapping document',
      'Built Informatica mappings, sessions and workflows for full and incremental loads',
      'Implemented SCD Type 1/2 logic and error handling with reject tables',
      'Tuned sessions with partitioning and pushdown optimisation and scheduled the jobs',
    ],
    learnings: ['Building mappings, sessions and workflows in PowerCenter', 'Moving integrations to Informatica Cloud (IDMC)', 'Handling history with SCD Type 1 and Type 2 loads'],
    hashtags: ['Informatica', 'ETL', 'DataIntegration', 'SQL'],
    emoji: '🔄',
    team: 'data integration teams',
    topic: 'Informatica / ETL',
    learnTip: 'an Informatica tip, a SQL trick, a project update',
    banner: 'data integration themed',
    fileName: 'Informatica_ETL_Developer',
    projectRe: /(mapping|workflow|built|developed|designed|migrat|implemented|loaded|integrat)/i,
    certRe: /informatica|idmc|iics/i,
    examples: {
      current: 'e.g. Production Support Analyst at Infosys',
      cert: 'e.g. Informatica Cloud Data Integration Developer',
      other: 'e.g. Teradata, Jira',
      p1: 'e.g. Built Informatica workflows to load daily sales from Oracle into a star-schema data warehouse with SCD Type 2 customer history',
      p2: 'e.g. Migrated 40 PowerCenter mappings to Informatica Cloud (IICS) with parameter files and automated scheduling',
    },
  },
  {
    id: 'dbt',
    label: 'dbt',
    course: 'dbt',
    logo: '/logos/dbt.svg',
    title: 'Analytics Engineer (dbt)',
    titleAlt: 'dbt Developer',
    projectRole: 'Analytics Engineer',
    jobTitles: ['Analytics Engineer', 'dbt Developer', 'Data Engineer'],
    training: 'dbt Analytics Engineering',
    field: 'analytics engineering',
    expLabel: 'data / analytics / BI',
    backgroundRe: /analytics engineer|data engineer|bi developer|data analyst|dbt/i,
    skills: [
      sk('dbt Core', /\bdbt\b/i), sk('dbt Cloud', /dbt cloud/i), sk('SQL', /\bsql\b/i), sk('Jinja & Macros', /jinja|macro/i),
      sk('Data Modeling', /data model(l)?ing|star schema|dimensional|kimball/i), sk('Incremental Models', /incremental/i),
      sk('dbt Tests', /dbt tests?|schema tests?|data tests?|data testing/i), sk('Documentation & Lineage', /lineage|documentation/i),
      hot('dbt Semantic Layer', /semantic layer|metricflow/i), hot('dbt Mesh', /dbt mesh|data mesh/i), hot('Data Contracts', /data contract/i),
      sk('Snowflake', /snowflake/i), sk('BigQuery', /bigquery/i), hot('Databricks', /databricks/i), sk('Git', /\bgit(hub|lab)?\b/i),
      sk('CI/CD', /ci\s*\/\s*cd|github actions|continuous integration/i), sk('Airflow', /airflow/i), sk('Python', /python/i),
      sk('Power BI', /power ?bi/i), sk('Looker', /looker/i),
    ],
    defaults: ['dbt Core', 'SQL', 'Jinja & Macros', 'Data Modeling', 'Incremental Models', 'dbt Tests', 'Snowflake', 'Git'],
    keySkillsExtra: ['Analytics Engineering', 'Data Transformation'],
    itSkills: 'dbt, SQL and Snowflake',
    pinSkills: 'dbt, SQL, Data Modeling',
    intro: {
      fresher: 'Analytics engineering professional trained in dbt and modern data modeling, with hands-on project experience building tested, documented data models.',
      switch: 'now specialised in analytics engineering with dbt through structured training and hands-on projects.',
      exp: 'building tested, version-controlled data models with dbt.',
    },
    core: 'Experienced in modular SQL modeling, Jinja macros, incremental models, dbt tests and documentation, and running dbt in CI/CD with Git.',
    headlineTag: { fresher: 'Hands-on data modeling projects', switch: 'Data modeling & transformation', exp: 'Building trusted data models' },
    liTag: { fresher: 'Data Modeling', exp: 'Building trusted analytics models' },
    enjoys: 'I enjoy turning messy tables into clean, tested models that everyone in the business can rely on.',
    highlight: { label: 'dbt', items: ['Models', 'Jinja & Macros', 'Incremental Models', 'Tests & Docs'] },
    responsibilities: [
      'Designed staging, intermediate and mart layers following dimensional modeling',
      'Built modular dbt models with Jinja macros and incremental materialisations',
      'Added schema and data tests, documentation and lineage for every model',
      'Set up Git-based CI/CD so every change is tested before it reaches production',
    ],
    learnings: ['Structuring projects into staging, intermediate and mart models', 'Writing reusable SQL with Jinja and macros', 'Testing and documenting every model so data stays trustworthy'],
    hashtags: ['dbt', 'AnalyticsEngineering', 'DataModeling', 'SQL'],
    emoji: '🧱',
    team: 'analytics teams',
    topic: 'dbt / analytics engineering',
    learnTip: 'a dbt tip, a modeling pattern, a project update',
    banner: 'analytics themed',
    fileName: 'Analytics_Engineer_dbt',
    projectRe: /(model|built|developed|designed|migrat|implemented|transform|test)/i,
    certRe: /\bdbt\b/i,
    examples: {
      current: 'e.g. Data Analyst at Accenture',
      cert: 'e.g. dbt Analytics Engineering Certification',
      other: 'e.g. Fivetran, Tableau',
      p1: 'e.g. Built an e-commerce analytics project in dbt on Snowflake: staging → marts → tested revenue and customer models',
      p2: 'e.g. Converted 25 legacy SQL scripts into incremental dbt models with tests, docs and GitHub CI',
    },
  },
  {
    id: 'business-analyst',
    label: 'Business Analyst',
    course: 'business-analyst',
    logo: '/logos/business-analyst.svg',
    title: 'Business Analyst',
    titleAlt: 'IT Business Analyst',
    projectRole: 'Business Analyst',
    jobTitles: ['Business Analyst', 'IT Business Analyst', 'Product Analyst'],
    training: 'Business Analysis',
    field: 'business analysis',
    expLabel: 'business analysis / product / consulting',
    backgroundRe: /business analyst|product analyst|functional consultant|product owner|\bba\b/i,
    skills: [
      sk('Requirements Gathering', /requirement/i), sk('BRD / FRD', /\bbrd\b|\bfrd\b|\bsrs\b/i), sk('User Stories', /user stor/i),
      sk('Agile / Scrum', /agile|scrum|sprint/i), sk('JIRA', /jira/i), sk('Confluence', /confluence/i),
      sk('Process Mapping (BPMN)', /process map|bpmn|flowchart|visio/i), sk('Stakeholder Management', /stakeholder/i),
      sk('UAT', /\buat\b|user acceptance/i), sk('Gap Analysis', /gap analysis/i), sk('SQL', /\bsql\b/i), sk('Excel', /excel/i),
      hot('Power BI', /power ?bi/i), sk('Tableau', /tableau/i), sk('Wireframing (Figma)', /figma|wirefram|balsamiq|mock ?up/i),
      hot('Generative AI for BAs', /chatgpt|gen(erative)? ?ai|copilot|prompt/i), hot('Product Analytics', /product analytics|mixpanel|amplitude|google analytics/i),
      sk('Data Analysis', /data analys/i),
    ],
    defaults: ['Requirements Gathering', 'BRD / FRD', 'User Stories', 'Agile / Scrum', 'JIRA', 'Process Mapping (BPMN)', 'Stakeholder Management', 'SQL'],
    keySkillsExtra: ['Business Analysis', 'Requirement Analysis'],
    itSkills: 'JIRA, SQL and Excel',
    pinSkills: 'Business Analysis, Requirements Gathering, Agile',
    intro: {
      fresher: 'Business analysis professional trained in requirements gathering, Agile delivery and process modeling, with hands-on project experience on real business cases.',
      switch: 'now specialised in business analysis through structured training and hands-on projects.',
      exp: 'gathering requirements, mapping processes and helping teams deliver the right solution.',
    },
    core: 'Experienced in running stakeholder workshops, writing BRDs, FRDs and user stories with acceptance criteria, mapping processes in BPMN, managing backlogs in JIRA and supporting UAT.',
    headlineTag: { fresher: 'Hands-on requirement & Agile projects', switch: 'Requirements & process analysis', exp: 'Turning business needs into delivery' },
    liTag: { fresher: 'Requirements & Agile', exp: 'Turning business needs into working solutions' },
    enjoys: 'I enjoy understanding how a business really works and translating that into clear requirements teams can build.',
    highlight: { label: 'Business analysis', items: ['Requirements', 'User Stories', 'BPMN', 'UAT'] },
    responsibilities: [
      'Ran stakeholder interviews and workshops to capture business requirements',
      'Wrote the BRD, FRD and user stories with clear acceptance criteria',
      'Mapped the as-is and to-be processes and documented the gap analysis',
      'Managed the backlog in JIRA and coordinated UAT and sign-off',
    ],
    learnings: ['Writing clear user stories with acceptance criteria', 'Mapping as-is and to-be processes in BPMN', 'Running UAT and getting stakeholder sign-off'],
    hashtags: ['BusinessAnalyst', 'BusinessAnalysis', 'Agile', 'Requirements'],
    emoji: '📊',
    team: 'product and delivery teams',
    topic: 'business analysis / Agile',
    learnTip: 'a requirements tip, an Agile lesson, a project update',
    banner: 'business / analytics themed',
    fileName: 'Business_Analyst',
    projectRe: /(requirement|process|built|developed|designed|implemented|analys|workshop|stor)/i,
    certRe: /\becba\b|\bccba\b|\bcbap\b|\biiba\b|scrum|pmi|business analys/i,
    examples: {
      current: 'e.g. Operations Executive at Wipro',
      cert: 'e.g. IIBA ECBA, Certified Scrum Product Owner',
      other: 'e.g. Miro, Lucidchart',
      p1: 'e.g. Gathered requirements and wrote 40 user stories for a loan-approval portal, cutting approval time from 5 days to 2',
      p2: 'e.g. Mapped the as-is and to-be order process in BPMN for a retail client and ran UAT with 12 business users',
    },
  },
  {
    id: 'java-full-stack',
    label: 'Java Full Stack',
    course: 'java-full-stack',
    logo: '/logos/java.svg',
    title: 'Java Full Stack Developer',
    titleAlt: 'Full Stack Developer (Java + React)',
    projectRole: 'Full Stack Developer',
    jobTitles: ['Java Full Stack Developer', 'Java Developer', 'Software Engineer'],
    training: 'Java Full Stack Development',
    field: 'full stack development',
    expLabel: 'software development',
    backgroundRe: /developer|software engineer|programmer|java|full stack|frontend|backend/i,
    skills: [
      sk('Core Java', /\bjava\b/i), hot('Java 21', /java\s*(17|21|25)/i), sk('Spring Boot', /spring ?boot|\bspring\b/i),
      sk('Spring Security', /spring security|jwt|oauth/i), sk('Hibernate / JPA', /hibernate|\bjpa\b/i), sk('REST APIs', /\brest(ful)?\b|\bapi\b/i),
      hot('Microservices', /micro[\s-]?services?/i), sk('React', /react/i), sk('Angular', /angular/i), sk('TypeScript', /typescript/i),
      sk('JavaScript', /javascript|\bjs\b/i), sk('HTML / CSS', /\bhtml\b|\bcss\b/i), sk('MySQL', /mysql/i), sk('PostgreSQL', /postgres/i),
      sk('MongoDB', /mongo/i), hot('Docker', /docker/i), hot('Kubernetes', /kubernetes|\bk8s\b/i), sk('AWS', /\baws\b/i),
      sk('Git', /\bgit(hub|lab)?\b/i), sk('Maven', /maven|gradle/i), sk('JUnit', /junit|mockito/i), sk('Kafka', /kafka/i),
      hot('Spring AI', /spring ai|langchain4j|openai/i),
    ],
    defaults: ['Core Java', 'Spring Boot', 'Hibernate / JPA', 'REST APIs', 'Microservices', 'React', 'MySQL', 'Git'],
    keySkillsExtra: ['Full Stack Development', 'Software Development'],
    itSkills: 'Java, Spring Boot and React',
    pinSkills: 'Java, Spring Boot, React',
    intro: {
      fresher: 'Full stack developer trained in Java, Spring Boot and React, with hands-on project experience building complete web applications from database to UI.',
      switch: 'now specialised in Java full stack development through structured training and hands-on projects.',
      exp: 'building web applications and REST services with Java, Spring Boot and modern frontends.',
    },
    core: 'Experienced in building REST APIs and microservices with Spring Boot, persisting data with Hibernate/JPA, creating responsive React UIs, securing apps with Spring Security and JWT, and shipping with Git and Docker.',
    headlineTag: { fresher: 'Hands-on full stack web projects', switch: 'Web apps & REST APIs', exp: 'Building scalable web applications' },
    liTag: { fresher: 'Spring Boot & React', exp: 'Building scalable web applications' },
    enjoys: 'I enjoy building complete features end to end, from the database and API to the screen people actually use.',
    highlight: { label: 'Java', items: ['Spring Boot', 'Microservices', 'REST APIs', 'Hibernate / JPA'] },
    responsibilities: [
      'Designed the database schema and built REST APIs with Spring Boot',
      'Implemented business logic, validation and JPA/Hibernate persistence',
      'Built responsive frontend screens and connected them to the APIs',
      'Added authentication, unit tests with JUnit and containerised the app with Docker',
    ],
    learnings: ['Building REST APIs and microservices with Spring Boot', 'Creating responsive frontends in React connected to real APIs', 'Securing apps with Spring Security and JWT and shipping them with Docker'],
    hashtags: ['Java', 'SpringBoot', 'FullStack', 'React'],
    emoji: '☕',
    team: 'engineering teams',
    topic: 'Java / Spring Boot / web development',
    learnTip: 'a Java tip, a Spring Boot feature, a project demo',
    banner: 'coding themed',
    fileName: 'Java_Full_Stack_Developer',
    projectRe: /(application|app|built|developed|designed|implemented|api|website|portal|system)/i,
    certRe: /oracle certified|\bocp\b|\boca\b|java|spring|aws certified/i,
    examples: {
      current: 'e.g. Technical Support Engineer at HCL',
      cert: 'e.g. Oracle Certified Professional: Java SE 17 Developer',
      other: 'e.g. Redis, Jenkins',
      p1: 'e.g. Built an online bookstore with Spring Boot REST APIs, React frontend, MySQL and JWT login, deployed with Docker',
      p2: 'e.g. Developed an employee management microservice with Spring Boot, JPA and Kafka events, with 80% JUnit test coverage',
    },
  },
  {
    id: 'test-engineer',
    label: 'Test Engineer',
    course: 'test-engineer',
    logo: '/logos/selenium.svg',
    title: 'QA Automation Test Engineer',
    titleAlt: 'Software Test Engineer (Manual + Automation)',
    projectRole: 'Test Engineer',
    jobTitles: ['QA Engineer', 'Automation Test Engineer', 'Software Test Engineer'],
    training: 'Software Testing (Manual + Automation)',
    field: 'software testing',
    expLabel: 'testing / QA',
    backgroundRe: /test engineer|qa |quality assurance|tester|testing|sdet/i,
    skills: [
      sk('Manual Testing', /manual testing|functional testing/i), sk('Test Case Design', /test case|test scenario|test plan/i),
      sk('SDLC / STLC', /\bsdlc\b|\bstlc\b/i), sk('Selenium WebDriver', /selenium/i), sk('Java', /\bjava\b/i), sk('TestNG', /testng/i),
      sk('Cucumber BDD', /cucumber|\bbdd\b|gherkin/i), hot('Playwright', /playwright/i), hot('Cypress', /cypress/i),
      sk('API Testing (Postman)', /postman|api testing/i), sk('Rest Assured', /rest[\s-]?assured/i), sk('JIRA', /jira/i), sk('SQL', /\bsql\b/i),
      sk('Jenkins CI/CD', /jenkins|ci\s*\/\s*cd|github actions/i), sk('Git', /\bgit(hub|lab)?\b/i), sk('JMeter', /jmeter|performance testing/i),
      sk('Appium (Mobile)', /appium|mobile testing/i), hot('AI-assisted Testing', /ai[\s-]?(assisted|powered|driven)? testing|copilot|chatgpt|gen(erative)? ?ai/i),
      sk('Agile / Scrum', /agile|scrum/i), sk('Defect Tracking', /defect|bug (life|track)/i),
    ],
    defaults: ['Manual Testing', 'Test Case Design', 'SDLC / STLC', 'Selenium WebDriver', 'Java', 'TestNG', 'API Testing (Postman)', 'JIRA'],
    keySkillsExtra: ['Software Testing', 'Automation Testing'],
    itSkills: 'Selenium, Java and Postman',
    pinSkills: 'Selenium, Automation Testing, Manual Testing',
    intro: {
      fresher: 'Software testing professional trained in manual and automation testing, with hands-on project experience building Selenium frameworks and API test suites.',
      switch: 'now specialised in manual and automation testing through structured training and hands-on projects.',
      exp: 'testing web applications and APIs and building automation frameworks.',
    },
    core: 'Experienced in writing test scenarios and test cases, logging and tracking defects in JIRA, building Selenium automation with Java, TestNG and Page Object Model, and testing REST APIs with Postman and Rest Assured.',
    headlineTag: { fresher: 'Hands-on automation framework projects', switch: 'Manual & automation testing', exp: 'Building reliable test automation' },
    liTag: { fresher: 'Manual & Automation Testing', exp: 'Shipping quality software' },
    enjoys: 'I enjoy finding the bugs before customers do and building automation that keeps every release safe.',
    highlight: { label: 'Testing', items: ['Selenium', 'TestNG', 'API Testing', 'Page Object Model'] },
    responsibilities: [
      'Analysed requirements and wrote test scenarios and test cases',
      'Built a Selenium + Java automation framework using Page Object Model and TestNG',
      'Automated REST API tests with Postman and Rest Assured',
      'Logged and tracked defects in JIRA and ran regression suites in Jenkins',
    ],
    learnings: ['Designing test cases that catch real bugs', 'Building a Selenium framework with Page Object Model and TestNG', 'Automating API tests with Postman and Rest Assured'],
    hashtags: ['SoftwareTesting', 'QA', 'Selenium', 'AutomationTesting'],
    emoji: '🧪',
    team: 'QA teams',
    topic: 'software testing / QA automation',
    learnTip: 'a testing tip, an automation trick, a project update',
    banner: 'QA / testing themed',
    fileName: 'QA_Automation_Test_Engineer',
    projectRe: /(test|automat|framework|built|developed|designed|implemented|regression)/i,
    certRe: /istqb|testing|selenium|certified tester/i,
    examples: {
      current: 'e.g. Customer Support Associate at Concentrix',
      cert: 'e.g. ISTQB Foundation Level',
      other: 'e.g. BrowserStack, Katalon',
      p1: 'e.g. Built a Selenium + Java + TestNG framework (Page Object Model) for an e-commerce site with 120 automated regression tests',
      p2: 'e.g. Automated 60 REST API tests with Rest Assured and Postman, running daily in Jenkins with HTML reports',
    },
  },
  {
    id: 'azure',
    label: 'Azure',
    course: 'azure',
    logo: '/logos/azure.svg',
    title: 'Azure Cloud & DevOps Engineer',
    titleAlt: 'Cloud Engineer (Microsoft Azure)',
    projectRole: 'Cloud Engineer',
    jobTitles: ['Azure Cloud Engineer', 'DevOps Engineer', 'Azure Administrator'],
    training: 'Microsoft Azure Cloud & DevOps',
    field: 'cloud engineering',
    expLabel: 'cloud / DevOps / infrastructure',
    backgroundRe: /cloud engineer|devops|system admin|sysadmin|infrastructure|azure|site reliability|sre/i,
    skills: [
      sk('Microsoft Azure', /azure/i), sk('Azure DevOps', /azure devops/i), sk('CI/CD Pipelines', /ci\s*\/\s*cd|pipeline/i),
      hot('Terraform', /terraform/i), sk('ARM / Bicep', /\barm template|bicep/i), hot('AKS (Kubernetes)', /\baks\b|kubernetes|\bk8s\b/i),
      sk('Docker', /docker|container/i), sk('Azure Functions', /azure functions|serverless/i), sk('App Service', /app service|web app/i),
      sk('Entra ID (Azure AD)', /entra|azure ad|active directory/i), sk('Networking (VNet, NSG)', /\bvnet\b|\bnsg\b|virtual network|load balancer/i),
      sk('Azure Monitor', /azure monitor|log analytics|app insights/i), sk('PowerShell', /powershell/i), sk('Linux', /linux/i), sk('Git', /\bgit(hub|lab)?\b/i),
      hot('GitHub Actions', /github actions/i), sk('Azure Data Factory', /azure data factory|\badf\b/i), hot('Microsoft Fabric', /fabric/i),
      hot('Azure OpenAI', /azure openai|ai foundry|openai/i),
    ],
    defaults: ['Microsoft Azure', 'Azure DevOps', 'CI/CD Pipelines', 'Terraform', 'AKS (Kubernetes)', 'Docker', 'Entra ID (Azure AD)', 'Linux'],
    keySkillsExtra: ['Cloud Computing', 'DevOps'],
    itSkills: 'Azure, Azure DevOps and Terraform',
    pinSkills: 'Microsoft Azure, DevOps, Terraform',
    intro: {
      fresher: 'Cloud professional trained in Microsoft Azure and DevOps, with hands-on project experience deploying applications and infrastructure as code.',
      switch: 'now specialised in Azure cloud and DevOps through structured training and hands-on projects.',
      exp: 'deploying and running cloud infrastructure and CI/CD pipelines on Microsoft Azure.',
    },
    core: 'Experienced in provisioning Azure resources with Terraform, building CI/CD pipelines in Azure DevOps, deploying containers to AKS, managing identity with Entra ID and monitoring workloads with Azure Monitor.',
    headlineTag: { fresher: 'Hands-on cloud & CI/CD projects', switch: 'Cloud infrastructure & DevOps', exp: 'Automating cloud infrastructure' },
    liTag: { fresher: 'Cloud & DevOps', exp: 'Automating reliable cloud infrastructure' },
    enjoys: 'I enjoy automating infrastructure so teams can ship faster with fewer late-night surprises.',
    highlight: { label: 'Azure', items: ['Azure DevOps', 'Terraform', 'AKS', 'Entra ID'] },
    responsibilities: [
      'Designed the Azure architecture: resource groups, VNets, NSGs and storage',
      'Provisioned infrastructure as code with Terraform',
      'Built CI/CD pipelines in Azure DevOps to build, test and deploy the application',
      'Deployed containers to AKS and set up monitoring and alerts in Azure Monitor',
    ],
    learnings: ['Provisioning Azure resources as code with Terraform', 'Building CI/CD pipelines in Azure DevOps', 'Deploying containers to AKS with monitoring and alerts'],
    hashtags: ['Azure', 'DevOps', 'CloudComputing', 'Terraform'],
    emoji: '☁️',
    team: 'cloud and DevOps teams',
    topic: 'Azure / DevOps / cloud',
    learnTip: 'an Azure service, a Terraform tip, a pipeline you built',
    banner: 'cloud themed',
    fileName: 'Azure_Cloud_DevOps_Engineer',
    projectRe: /(deploy|pipeline|built|developed|designed|migrat|implemented|automated|provision|infrastructure)/i,
    certRe: /az-\d{3}|azure|microsoft certified|terraform/i,
    examples: {
      current: 'e.g. System Administrator at Tech Mahindra',
      cert: 'e.g. AZ-104 Azure Administrator, AZ-400 DevOps Engineer',
      other: 'e.g. Ansible, Grafana',
      p1: 'e.g. Deployed a 3-tier web app on Azure with Terraform, Azure DevOps CI/CD and AKS, with alerts in Azure Monitor',
      p2: 'e.g. Migrated 15 on-prem VMs to Azure with backup, Entra ID access control and cost dashboards',
    },
  },
  {
    id: 'salesforce',
    label: 'Salesforce',
    course: 'salesforce',
    logo: '/logos/salesforce.svg',
    title: 'Salesforce Developer',
    titleAlt: 'Salesforce Developer & Admin',
    projectRole: 'Salesforce Developer',
    jobTitles: ['Salesforce Developer', 'Salesforce Administrator', 'Salesforce Consultant'],
    training: 'Salesforce Administration & Development',
    field: 'Salesforce CRM',
    expLabel: 'Salesforce / CRM',
    backgroundRe: /salesforce|crm|apex|sfdc/i,
    skills: [
      sk('Salesforce Admin', /salesforce admin|administrator|salesforce/i), sk('Apex', /\bapex\b/i), sk('Lightning Web Components (LWC)', /\blwc\b|lightning web component/i),
      sk('SOQL / SOSL', /soql|sosl/i), sk('Flows', /\bflows?\b|flow builder/i), sk('Triggers', /trigger/i), sk('Visualforce', /visualforce/i),
      sk('Sales Cloud', /sales cloud/i), sk('Service Cloud', /service cloud/i), sk('Experience Cloud', /experience cloud|community cloud/i),
      hot('Agentforce', /agentforce/i), hot('Data Cloud', /data cloud|data 360/i), hot('Einstein AI', /einstein/i),
      sk('Integration (REST / SOAP)', /\brest\b|\bsoap\b|integration/i), sk('Security & Sharing', /sharing rule|profiles? and permission|permission set|\bowd\b|role hierarchy/i),
      sk('Reports & Dashboards', /reports?\s*(and|&)\s*dashboards?|dashboards?/i), sk('Salesforce DX', /\bsfdx\b|salesforce dx|\bsf cli\b/i), sk('Git / Copado', /copado|gearset|\bgit(hub|lab)?\b/i),
    ],
    defaults: ['Salesforce Admin', 'Apex', 'Lightning Web Components (LWC)', 'SOQL / SOSL', 'Flows', 'Triggers', 'Sales Cloud', 'Security & Sharing'],
    keySkillsExtra: ['Salesforce CRM', 'CRM Development'],
    itSkills: 'Salesforce, Apex and LWC',
    pinSkills: 'Salesforce, Apex, Lightning Web Components',
    intro: {
      fresher: 'Salesforce professional trained in administration and development, with hands-on project experience building CRM solutions on Sales and Service Cloud.',
      switch: 'now specialised in Salesforce administration and development through structured training and hands-on projects.',
      exp: 'configuring and developing CRM solutions on the Salesforce platform.',
    },
    core: 'Experienced in configuring objects, security and Flows, writing Apex classes and triggers, building Lightning Web Components, querying with SOQL and integrating Salesforce with external systems through REST APIs.',
    headlineTag: { fresher: 'Hands-on CRM projects', switch: 'Salesforce admin & development', exp: 'Building scalable CRM solutions' },
    liTag: { fresher: 'Admin & Development', exp: 'Building CRM solutions that sales teams love' },
    enjoys: 'I enjoy automating the busywork so sales and service teams can focus on customers.',
    highlight: { label: 'Salesforce', items: ['Apex', 'LWC', 'Flows', 'SOQL'] },
    responsibilities: [
      'Gathered requirements and designed custom objects, fields and page layouts',
      'Automated processes with Flows and wrote Apex classes and triggers',
      'Built Lightning Web Components for custom UI',
      'Set up profiles, permission sets, sharing rules and reports & dashboards',
    ],
    learnings: ['Automating business processes with Flows', 'Writing Apex triggers and building Lightning Web Components', 'Setting up security, sharing rules and dashboards'],
    hashtags: ['Salesforce', 'SalesforceDeveloper', 'Apex', 'LWC'],
    emoji: '☁️',
    team: 'Salesforce teams',
    topic: 'Salesforce / CRM',
    learnTip: 'a Salesforce feature, a Flow tip, a Trailhead badge',
    banner: 'CRM / Salesforce themed',
    fileName: 'Salesforce_Developer',
    projectRe: /(built|developed|designed|implemented|automated|configured|flow|apex|integrat|migrat)/i,
    certRe: /salesforce|trailhead|platform developer|administrator/i,
    examples: {
      current: 'e.g. Sales Coordinator at Byju’s',
      cert: 'e.g. Salesforce Certified Administrator, Platform Developer I',
      other: 'e.g. MuleSoft, Tableau CRM',
      p1: 'e.g. Built a lead-to-opportunity CRM for a real-estate firm with Flows, Apex triggers and an LWC property search',
      p2: 'e.g. Set up Service Cloud case management with auto-assignment rules, SLAs and a support dashboard',
    },
  },
];

export const defaultRole = roles[0];
export const findRole = (id: string | undefined | null) => roles.find((r) => r.id === id) ?? defaultRole;

/** Technologies we also recognise in a resume (shown under "Other skills") */
export const commonExtras = [
  'Informatica', 'Talend', 'Matillion', 'Fivetran', 'Kafka', 'Databricks', 'BigQuery', 'Redshift', 'Azure', 'AWS', 'GCP', 'Oracle',
  'SQL Server', 'MySQL', 'PostgreSQL', 'MongoDB', 'Unix', 'Shell Scripting', 'Linux', 'Jira', 'Excel', 'Hadoop', 'Hive', 'SSIS', 'Docker',
  'Kubernetes', 'Jenkins', 'Python', 'Java', 'JavaScript', 'React', 'Angular', 'Node.js', 'Power BI', 'Tableau', 'Selenium', 'Postman',
  'Terraform', 'Salesforce', 'ServiceNow', 'SAP', 'Spark', 'Airflow', 'dbt', 'Snowflake', 'Git',
];

export const cities = [
  'Bangalore', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Mumbai', 'Navi Mumbai', 'Delhi', 'New Delhi', 'Noida', 'Gurgaon', 'Gurugram',
  'Kolkata', 'Ahmedabad', 'Kochi', 'Coimbatore', 'Trivandrum', 'Indore', 'Jaipur', 'Chandigarh', 'Mysore', 'Vizag', 'Visakhapatnam',
  'Vijayawada', 'Nagpur', 'Bhubaneswar', 'Lucknow',
];

export const notices = ['Immediate joiner', '15 days', '30 days', '60 days', '90 days'] as const;
