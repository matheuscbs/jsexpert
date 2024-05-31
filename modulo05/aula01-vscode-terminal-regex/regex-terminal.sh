# a partir da pasta raiz
find . -name *.test.js
find . -name *.test.js -not -path '*node_modules**'
find . -name *.js -not -path '*node_modules**'

# npm i -g ipt
# find . -name *.js -not -path '*node_modules**' | ipt

# volta para a pasta do modulo05
# cp -r ../../modulo01/aula05-tdd-desafio-resolvido .

# seleciona o arquivo
CONTENT="'use strict';"
find . -name '*.js' -not -path '*node_modules*' \
| ipt -o \
| xargs -I {file} sed -i'' -e "1s|^|$CONTENT\\n|" {file}

# substitui tudo!
CONTENT="'use strict';"
find . -name '*.js' -not -path '*node_modules*' \
| ipt -o \
| xargs -I {file} sed -i'' -e "1s|^|$CONTENT\\n|" {file}

# 1s - primeira linha
# ^ - início da linha
# /g - global
# \' - escape para aspas simples
# $CONTENT - conteúdo da variável
# /g - global
# {file} - arquivo de entrada
# -i '' - edição in-place
# -e - expressão
