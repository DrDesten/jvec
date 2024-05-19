const TAGS = [
    'abstract',
    'virtual',
    'access',
    'alias',
    'async',
    'augments',
    'extends',
    'author',
    'borrows',
    'class',
    'constructor',
    'classdesc',
    'constant',
    'const',
    'constructs',
    'copyright',
    'default',
    'defaultvalue',
    'deprecated',
    'description',
    'desc',
    'enum',
    'event',
    'example',
    'exports',
    'external',
    'host',
    'file',
    'fileoverview',
    'overview',
    'fires',
    'emits',
    'function',
    'func',
    'method',
    'generator',
    'global',
    'hideconstructor',
    'ignore',
    'implements',
    'inheritdoc',
    'inner',
    'instance',
    'interface',
    'kind',
    'lends',
    'license',
    'listens',
    'member',
    'var',
    'memberof',
    'mixes',
    'mixin',
    'module',
    'name',
    'namespace',
    'override',
    'package',
    'param',
    'arg',
    'argument',
    'private',
    'property',
    'prop',
    'protected',
    'public',
    'readonly',
    'requires',
    'returns',
    'return',
    'see',
    'since',
    'static',
    'summary',
    'this',
    'throws',
    'exception',
    'todo',
    'tutorial',
    'type',
    'typedef',
    'variation',
    'version',
    'yields',
    'yield',
    'link',
    'linkcode',
    'linkplain',
    'tutorial'
]


/**
 * @typedef {'abstract'|'virtual'|'access'|'alias'|'async'|'augments'|'extends'|'author'|'borrows'|'class'|'constructor'|'classdesc'|'constant'|'const'|'constructs'|'copyright'|'default'|'defaultvalue'|'deprecated'|'description'|'desc'|'enum'|'event'|'example'|'exports'|'external'|'host'|'file'|'fileoverview'|'overview'|'fires'|'emits'|'function'|'func'|'method'|'generator'|'global'|'hideconstructor'|'ignore'|'implements'|'inheritdoc'|'inner'|'instance'|'interface'|'kind'|'lends'|'license'|'listens'|'member'|'var'|'memberof'|'mixes'|'mixin'|'module'|'name'|'namespace'|'override'|'package'|'param'|'arg'|'argument'|'private'|'property'|'prop'|'protected'|'public'|'readonly'|'requires'|'returns'|'return'|'see'|'since'|'static'|'summary'|'this'|'throws'|'exception'|'todo'|'tutorial'|'type'|'typedef'|'variation'|'version'|'yields'|'yield'|'link'|'linkcode'|'linkplain'|'tutorial'} JSDocTag
 * @typedef {string} JSDocType
 * @typedef {string} JSDocIdentifier
 * @typedef {string} JSDocDescription
 * @typedef {{optional?: boolean, default?: string}} JSDocStatementOptions
 * @typedef {JSDocDescription|[JSDocTag, JSDocStatementOptions?]|[JSDocTag, JSDocType, JSDocStatementOptions?]|[JSDocTag, JSDocType, JSDocName, JSDocStatementOptions?]|[JSDocTag, JSDocType, JSDocName, JSDocDescription, JSDocStatementOptions?]} JSDocStatement
 * @typedef {{multiline?: boolean}} JSDocOptions
 */

/** @param {JSDocStatement[]} [statements] @param {JSDocOptions} [options]  */
export function JSDoc( statements = [], options = {} ) {
    // Set defaults
    options = { multiline: false, ...options }

    // Preprocess Statements
    statements = statements.map( statement => {
        if ( typeof statement === "string" ) return statement

        const options = {
            optional: false,
            default: undefined,
            ...( typeof statement.at( -1 ) === "object" ? statement.pop() : {} )
        }
        const tag = statement[0]
        const type = statement[1]
        const name = statement[2]
        const description = statement[3]

        return `@${tag}`
            + ( type ? ` {${type}}` : `` )
            + ( name ? ` ${options.optional ? `[${name}${options.default ? `=${options.default}` : ``}]` : name}` : `` )
            + ( description ? ` ${description}` : `` )
    } )

    if ( options.multiline ) {
        statements = statements.map( s => " * " + s )
        return `/**\n${statements.join( "\n" )}\n */`
    } else {
        return `/** ${statements.join( " " )} */`
    }
}