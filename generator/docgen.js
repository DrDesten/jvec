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
 * @typedef {[JSDocTag, JSDocType?, string?, string?]} JSDocStatement [ tag, type?, name?, description? ]
 * @typedef {{multiline?: boolean}} JSDocOptions
 */

/** @param {JSDocStatement[]} [statements] @param {JSDocOptions} [options]  */
export function JSDoc( statements = [], options = {} ) {
    // Set defaults
    options = { multiline: false, ...options }

    // Preprocess Statements
    statements = statements.map( ( [tag, type, name, description] ) =>
        `@${tag}${type ? ` {${type}}` : ``}${name ? ` ${name}` : ``}${description ? ` ${description}` : ``}`
    )

    if ( options.multiline ) {
        statements = statements.map( s => " * " + s )
        return `/**\n${statements.join( "\n" )}\n */`
    } else {
        return `/** ${statements.join( " " )} */`
    }
}