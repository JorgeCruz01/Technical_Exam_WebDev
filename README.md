Sistema de Gestión de Personas - Examen Técnico GPX
===================================================

📖 Descripción del Proyecto
---------------------------

Aplicación web full-stack para gestionar personas con operaciones CRUD completas desarrollada con Angular 19 y Node.js + GraphQL.

### Requisitos Cumplidos ✅

*   **Frontend**: Angular 19 con componentes standalone
    
*   **Backend**: Node.js con Express y GraphQL
    
*   **Base de Datos**: SQLite con Sequelize ORM
    
*   **Estado**: NgRx para manejo reactivo
    
*   **Estándares**: ES6+, TypeScript, RxJS
    

🏗️ Arquitectura del Sistema
----------------------------

```mermaid
graph LR
A[Angular Components] --> B[NgRx Store]
B --> C[Effects]
C --> D[HTTP Service]
D --> E[GraphQL API]
E --> F[Sequelize ORM]
F --> G[(SQLite DB)]
```


🛠️ Tecnologías y Versiones
---------------------------

### Entorno de Desarrollo

*   **Node.js**: 20.18.3
    
*   **npm**: 11.4.0
    
*   **Angular CLI**: 19.2.12
    

### Frontend Dependencies

`jsonCopy Code{      "dependencies": {        "@angular/common": "^19.2.0",        "@angular/compiler": "^19.2.0",        "@angular/core": "^19.2.0",        "@angular/forms": "^19.2.0",        "@angular/platform-browser": "^19.2.0",        "@angular/platform-browser-dynamic": "^19.2.0",        "@angular/router": "^19.2.0",        "@ngrx/effects": "^19.2.1",        "@ngrx/entity": "^19.2.1",        "@ngrx/store": "^19.2.1",        "@ngrx/store-devtools": "^19.2.1",        "rxjs": "~7.8.0",        "tslib": "^2.3.0",        "zone.js": "~0.15.0"      },      "devDependencies": {        "@angular-devkit/build-angular": "^19.2.12",        "@angular/cli": "^19.2.12",        "@angular/compiler-cli": "^19.2.0",        "@types/jasmine": "~5.1.0",        "typescript": "~5.7.2"      }    }`  

### Backend Dependencies

`jsonCopy Code{      "dependencies": {        "apollo-server-express": "^3.13.0",        "cors": "^2.8.5",        "express": "^4.18.2",        "graphql": "^16.11.0",        "sequelize": "^6.37.7",        "sqlite3": "^5.1.7"      },      "devDependencies": {        "@types/cors": "^2.8.19",        "@types/express": "^5.0.3",        "@types/node": "^24.0.1",        "nodemon": "^3.1.10",        "ts-node": "^10.9.2",        "typescript": "^5.8.3"      }    }`  

📁 Estructura del Proyecto
--------------------------

`technical-exam/    ├── backend/    │   ├── src/    │   │   ├── config/database.js    │   │   ├── models/Persona.js    │   │   ├── schema/    │   │   │   ├── typeDefs.js    │   │   │   └── resolvers.js    │   │   └── index.ts    │   ├── package.json    │   └── tsconfig.json    ├── frontend/    │   ├── src/app/    │   │   ├── components/    │   │   ├── models/persona.model.ts    │   │   ├── services/persona.service.ts    │   │   ├── store/persona/    │   │   ├── app.component.ts    │   │   └── app.config.ts    │   └── package.json    └── README.md`  

🚀 Instalación y Configuración
------------------------------

### Backend

`bashCopy Codecd backend    npm install    npm run build    npm run dev    # http://localhost:3000`  

### Frontend

`bashCopy Codecd frontend    npm install    ng serve       # http://localhost:4200`  

⚡ Funcionalidades Implementadas
-------------------------------

### GraphQL Operations

#### Crear Persona

`graphqlCopy Codemutation CrearPersona($input: PersonaInput!) {      crearPersona(input: $input) {        id nombres apellidoPaterno apellidoMaterno direccion telefono      }    }`  

#### Listar Personas

`graphqlCopy Codequery ObtenerPersonas {      personas {        id nombres apellidoPaterno apellidoMaterno direccion telefono      }    }`  

#### Actualizar Persona

`graphqlCopy Codemutation ActualizarPersona($id: ID!, $input: PersonaInput!) {      actualizarPersona(id: $id, input: $input) {        id nombres apellidoPaterno apellidoMaterno direccion telefono      }    }`  

#### Eliminar Persona

`graphqlCopy Codemutation EliminarPersona($id: ID!) {      eliminarPersona(id: $id)    }`  

📊 Diagramas Técnicos
---------------------

### Flujo de Datos NgRx

`mermaidCopy CodesequenceDiagram        participant C as Component        participant S as Store        participant E as Effects        participant API as GraphQL API        participant DB as SQLite        C->>S: Dispatch Action        S->>E: Trigger Effect        E->>API: HTTP Request        API->>DB: SQL Query        DB-->>API: Result        API-->>E: GraphQL Response        E->>S: Success Action        S->>C: State Update`  

### Base de Datos

`mermaidCopy CodeerDiagram        PERSONA {            INTEGER id PK            STRING nombres            STRING apellidoPaterno            STRING apellidoMaterno            STRING direccion            STRING telefono            DATETIME createdAt            DATETIME updatedAt        }`  

🎯 Patrones Implementados
-------------------------

### 1\. Componentes Standalone (Angular 19)

`typescriptCopy Code@Component({      selector: 'app-persona-list',      standalone: true,      imports: [CommonModule, FormsModule],      templateUrl: './persona-list.component.html'    })`  

### 2\. NgRx con inject()

`typescriptCopy Codeexport class PersonaEffects {      private actions$ = inject(Actions);      private personaService = inject(PersonaService);      loadPersonas$ = createEffect(() => {        return this.actions$.pipe(          ofType(PersonaActions.loadPersonas),          switchMap(() => this.personaService.getPersonas())        );      });    }`  

### 3\. Reactive Programming

`typescriptCopy Code// Búsqueda reactiva    filteredPersonas$ = combineLatest([      this.store.select(selectAllPersonas),      this.searchTerm$    ]).pipe(      map(([personas, term]) => this.filterPersonas(personas, term))    );`  

🧠 Decisiones Técnicas Clave
----------------------------

### ¿Por qué Angular 19 Standalone?

*   Mejor tree-shaking y performance
    
*   Eliminación de NgModules
    
*   Sintaxis moderna y menos boilerplate
    

### ¿Por qué GraphQL?

*   Single endpoint /graphql
    
*   Tipado fuerte con schema
    
*   Prevención de over-fetching
    
*   Herramientas de desarrollo integradas
    

### ¿Por qué NgRx?

*   Estado predecible y debuggeable
    
*   Manejo de side-effects con Effects
    
*   Time-travel debugging
    
*   Patrón Redux probado
    

### ¿Por qué SQLite + Sequelize?

*   Base de datos embebida sin configuración
    
*   ORM con validaciones y migraciones
    
*   Perfecto para desarrollo y demos
    

🔧 Comandos Útiles
------------------

### Backend

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`bashCopy Codenpm run dev     # Desarrollo con hot reload    npm run build   # Compilar TypeScript    npm start       # Producción`  

### Frontend

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`bashCopy Codeng serve                    # Desarrollo    ng build --prod            # Build producción    ng test                    # Tests unitarios`  

### GraphQL Code Code Playground

*   Acceder a: [http://localhost:3000/graphql](http://localhost:3000/graphql)
    
*   Explorar schema y ejecutar queries
    

✅ Características Destacadas
----------------------------

*   **CRUD Completo**: Crear, leer, actualizar, eliminar personas
    
*   **Búsqueda en Tiempo Real**: Filtrado reactivo por nombre/apellidos
    
*   **Validaciones**: Frontend (Angular Forms) y Backend (Sequelize)
    
*   **Estado Reactivo**: NgRx Store con Effects y Selectors
    
*   **Tipado Fuerte**: TypeScript en frontend y backend
    
*   **Componentes Modernos**: Standalone components de Angular 19
    
*   **GraphQL Schema**: API tipada y autodocumentada
    
*   **Base de Datos**: SQLite con ORM Sequelize
    

**Desarrollado para**: Examen Técnico Global Primex Tecnología**Tecnologías**: Angular 19, Node.js, GraphQL, SQLite, NgRx, TypeScript