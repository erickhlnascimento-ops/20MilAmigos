# Landing page — Instituto Sophia

Landing page responsiva em HTML, CSS e JavaScript, criada a partir dos requisitos fornecidos.

## Como executar
1. Extraia a pasta do projeto.
2. Abra `index.html` no navegador ou use a extensão Live Server no VS Code.
3. Para publicar, envie os arquivos para o serviço de hospedagem escolhido.

## Funcionalidades incluídas
- Cabeçalho fixo e menu por âncoras, com menu mobile.
- Hero com CTA para a seção Pix.
- Botão para copiar o CNPJ informado.
- Seções Quem Somos, Quem Atendemos, Campanhas, Como Ajudar, Bazar e Redes.
- Carrossel com setas, rolagem por toque e autoplay, respeitando preferência por movimento reduzido.
- Modais e validação básica de formulário.
- Links de localização, WhatsApp e redes sociais como campos a configurar.
- Rodapé com CNPJ e aviso inicial de privacidade.
- Meta description, hierarquia de títulos e texto alternativo em imagens.

## Antes de publicar — obrigatório conferir
1. **Pix:** o CNPJ foi inserido conforme fornecido, mas confirme com a ONG se ele está cadastrado como chave Pix. Substitua o QR ilustrativo por um QR Code Pix oficial e testado. Não publique o QR de demonstração.
2. **Identidade e história:** confirme o nome oficial, a história da Sophia, o texto institucional e os critérios de atendimento.
3. **Campanhas:** troque as imagens ilustrativas por fotos autorizadas das ações reais. Prefira imagens WebP otimizadas, com dimensões adequadas.
4. **Bazar:** preencha endereço, dias e horários reais. Troque `ENDERECO_DO_BAZAR` no link do Google Maps.
5. **Links:** substitua `#` nos links de Instagram/Facebook/WhatsApp e o link `https://wa.me/` pelo contato oficial.
6. **Formulário:** atualmente a validação funciona no navegador, mas os dados não são enviados nem armazenados. Conecte um backend ou serviço de formulários antes de aceitar cadastros.
7. **LGPD:** revise o aviso de privacidade com a instituição e informe o canal de contato apropriado.
8. **Desempenho:** as imagens de demonstração carregam de um serviço externo. Para melhor desempenho, hospede imagens otimizadas em WebP localmente.

## Estrutura
- `index.html`: estrutura e conteúdo da página.
- `css/style.css`: estilos responsivos.
- `js/script.js`: menu, cópia Pix, carrossel, modais e validação.
- `assets/img/`: pasta para imagens locais da ONG.


## Paleta de cores
- Azul institucional: `rgb(35, 97, 146)`
- Amarelo institucional: `rgb(241, 190, 72)`
- Vermelho institucional: `rgb(228, 75, 85)`

## Adicionar o vídeo do YouTube

A página inclui uma seção responsiva chamada **“Nossa história em vídeo”**. Para exibir seu vídeo:

1. Abra `index.html` e procure por `VIDEO_ID_DO_YOUTUBE`.
2. No link do vídeo, copie apenas o ID. Exemplo: em `https://www.youtube.com/watch?v=ABC123`, o ID é `ABC123`.
3. Substitua `VIDEO_ID_DO_YOUTUBE` pelo ID real, mantendo o restante do endereço `https://www.youtube-nocookie.com/embed/`.
4. Salve e publique novamente o site. O vídeo se ajusta automaticamente a celulares e computadores.
