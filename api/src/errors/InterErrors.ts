import fs from "fs";
import path from "path";

/**
 * PARA MELHOR DOCUMENTAÇÃO, utilize a seguinte sintaxe para emitir erros de 
 * QUALQUER natureza
 * Erros de Variáveis de Ambiente (ENV)

ENV_<VARIAVEL>_UNDEFINED: Usado quando uma variável de ambiente obrigatória não foi definida.
Exemplo: ENV_PORT_UNDEFINED, ENV_DB_URL_UNDEFINED
ENV_<VARIAVEL>_INVALID: Usado quando uma variável de ambiente tem um valor inválido.
Exemplo: ENV_DB_URL_INVALID, ENV_API_KEY_INVALID
Erros de Conexão com Banco de Dados (DB)

DB_CONNECTION_FAILED: Usado quando a conexão com o banco de dados falha.
DB_QUERY_FAILED: Usado quando uma consulta ao banco de dados falha.
DB_QUERY_SYNTAX_ERROR: Usado quando há erro de sintaxe em uma consulta SQL.
DB_QUERY_TIMEOUT: Usado quando uma consulta excede o tempo limite de execução.
DB_DUPLICATE_ENTRY: Usado quando há uma tentativa de inserir dados duplicados em uma tabela.
Erros de Consultas (Query)

QUERY_PARAMETER_MISSING: Quando parâmetros esperados estão ausentes em uma consulta.
QUERY_PARAMETER_INVALID: Quando parâmetros em uma consulta não são válidos (por exemplo, tipo de dado errado).
QUERY_EXECUTION_FAILED: Quando a execução de uma consulta falha por qualquer motivo.
QUERY_TIMEOUT: Quando uma consulta excede o tempo limite definido.
QUERY_SYNTAX_ERROR: Quando há erro de sintaxe em uma consulta SQL.
Erros de Respostas (Response)

RESPONSE_TIMEOUT: Quando uma resposta não é recebida no tempo esperado.
RESPONSE_NOT_FOUND: Quando a resposta não é encontrada (ex: erro 404).
RESPONSE_UNAUTHORIZED: Quando a resposta é não autorizada (erro 401).
RESPONSE_INVALID_FORMAT: Quando a resposta está no formato incorreto.
RESPONSE_PARSE_ERROR: Quando há um erro ao tentar parsear a resposta recebida.
Erros de Autenticação e Autorização

AUTH_USER_NOT_FOUND: Quando o usuário não é encontrado durante o processo de autenticação.
AUTH_INVALID_CREDENTIALS: Quando as credenciais fornecidas são inválidas.
AUTH_UNAUTHORIZED: Quando um usuário tenta acessar um recurso sem permissão.
AUTH_TOKEN_EXPIRED: Quando o token de autenticação expirou.
AUTH_TOKEN_INVALID: Quando o token de autenticação é inválido.
Erros de Arquivo e Sistema de Arquivos (FS)

FS_FILE_NOT_FOUND: Quando um arquivo não é encontrado no sistema.
FS_PERMISSION_DENIED: Quando a permissão para acessar ou modificar um arquivo é negada.
FS_READ_FAILED: Quando ocorre um erro ao tentar ler um arquivo.
FS_WRITE_FAILED: Quando ocorre um erro ao tentar escrever em um arquivo.
FS_FILE_TOO_LARGE: Quando o arquivo é muito grande para ser processado.
Erros de Formatação e Validação

VALIDATION_MISSING_FIELD: Quando um campo obrigatório está ausente.
VALIDATION_FIELD_INVALID: Quando um campo não tem o formato esperado (ex: email mal formatado).
VALIDATION_FIELD_TOO_SHORT: Quando um campo tem menos caracteres do que o necessário.
VALIDATION_FIELD_TOO_LONG: Quando um campo ultrapassa o limite de caracteres.
VALIDATION_UNEXPECTED_VALUE: Quando um valor inesperado é fornecido para um campo.
Erros de Rede (Network)

NETWORK_CONNECTION_FAILED: Quando a conexão de rede falha.
NETWORK_TIMEOUT: Quando uma operação de rede excede o tempo limite.
NETWORK_UNAVAILABLE: Quando a rede não está disponível.
NETWORK_INVALID_RESPONSE: Quando a resposta de rede não está no formato esperado.
Erros de API

API_REQUEST_FAILED: Quando a requisição para a API falha.
API_RESPONSE_ERROR: Quando a API responde com um erro (ex: 500).
API_LIMIT_EXCEEDED: Quando o limite de requisições da API é atingido.
API_RATE_LIMIT_REACHED: Quando o limite de taxa de requisições é atingido.
API_INVALID_KEY: Quando a chave de API fornecida é inválida.
Erros de Integrações Externas

EXTERNAL_SERVICE_UNAVAILABLE: Quando um serviço externo está indisponível.
EXTERNAL_SERVICE_TIMEOUT: Quando o tempo de resposta de um serviço externo excede o limite.
EXTERNAL_SERVICE_ERROR: Quando ocorre um erro em um serviço externo durante a comunicação.
Erros de Usuário (User Errors)

USER_NOT_FOUND: Quando o usuário não é encontrado.
USER_ALREADY_EXISTS: Quando o usuário já existe.
USER_INVALID_PASSWORD: Quando a senha fornecida é inválida.
USER_ACCOUNT_LOCKED: Quando a conta do usuário está bloqueada.
Erros de Configuração (Config)

CONFIG_LOAD_FAILED: Quando falha ao carregar um arquivo de configuração.
CONFIG_INVALID_FORMAT: Quando o formato do arquivo de configuração é inválido.
CONFIG_MISSING_KEY: Quando uma chave necessária está ausente no arquivo de configuração.
Erros de Sistema (System Errors)

SYSTEM_OUT_OF_MEMORY: Quando o sistema fica sem memória.
SYSTEM_DISK_FULL: Quando o disco está cheio.
SYSTEM_FILE_SYSTEM_ERROR: Quando ocorre um erro no sistema de arquivos.
SYSTEM_UNEXPECTED_SHUTDOWN: Quando o sistema sofre um desligamento inesperado.
Erros de Limite de Taxa (Rate Limiting)

RATE_LIMIT_EXCEEDED: Quando o número de requisições ultrapassa o limite estabelecido.
RATE_LIMIT_BLOCKED: Quando o acesso é bloqueado devido ao limite de taxa.
 */

export class InterErrors extends Error {
    private _title: string;
    private _origin: Function;
    private _error: string;
    private _time: Date;
    private _filePath: string;
    private _extraData?: ExtraData;

    constructor(title: string, origin: Function, error: string, extraData?: ExtraData) {
        super(title);
        this._title = title;
        this._origin = origin;
        this._error = error;
        this._time = new Date();
        this._filePath = path.join(__dirname, "logs");
        this._extraData = extraData;
        if (!fs.existsSync(this._filePath)) {
            fs.mkdirSync(this._filePath, { recursive: true });
        }
    }

    public saveLog(logContent: string): void {
        const timestamp = this._time.toISOString().replace(/[:.]/g, "-");
        const fileName = `${timestamp}_${this._title}.txt`;
        const fullPath = path.join(this._filePath, fileName);

        fs.writeFileSync(fullPath, logContent, { encoding: "utf-8" });
        console.log(`Error log saved to ${fullPath}`);
    }
    /**
     * Método para formatar o conteúdo do log, incluindo extraData dinamicamente
     * OBS** Esse método será alterado, para salvar enviar o log dos erros por email
     */
    protected formatLogContent(): string {
        let baseContent = `
--- Error Log ---
Title: ${this._title}
Time: ${this._time.toISOString()}
Origin: ${this._origin.name}
Message: ${this._error}
Stack Trace:
${this.stack}
        `;
        if (this._extraData) {
            baseContent += "\n--- Extra Data ---\n";
            for (const [key, value] of Object.entries(this._extraData)) {
                baseContent += `${key}: ${JSON.stringify(value)}\n`;
            }
        }
        return baseContent;
    }
}

export class RunningErrors extends InterErrors {
    constructor(origin: Function, error: string) {
        super("API_RUNNING_ERR", origin, error);
        this.saveLog(this.formatLogContent());
    }
}

export class DatabaseErrors extends InterErrors {
    constructor(origin: Function, error: string, query?: string, params?: any[]) {
        const extraData: ExtraData = {};
        if (query) extraData.query = query;
        if (params) extraData.params = params;
        super("DB_ERROR", origin, error, extraData);
        this.saveLog(this.formatLogContent());
    }
}
