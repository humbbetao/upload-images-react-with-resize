var MAX_WIDTH = 800;
var MAX_HEIGHT = 600;

export default function resize(image, callback) {
  //criamos img que será a nossa imagem nova
  const img = new Image();

  //criamos um reader que lerá a nossa imagem
  const reader = new FileReader();

  //função de callback quando o canvas converter para blob
  const createFileFromBlob = blob => {
    //criamos um file com o blob passando o nome da imagem, o tipo e a ultima modificação
    const imageResized = new File([blob], image.name, {
      type: image.type,
      lastModified: Date.now()
    });
    //callback function que será a sua função de upload para os servidor
    callback(imageResized);
  };

  //vamos escrever o método do onload do reader
  //porque ele é chamado no momento em que é finalizado a carregamento da imagem
  reader.onload = e => {
    img.src = e.target.result;

    //quando a imagem fora carregada após receber o a linha superior
    img.onload = () => {
      //criamos um canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      //desenhamos a imagem na posição (0,0)
      ctx.drawImage(img, 0, 0);

      //fazemos calculos para saber  qual lado é maior e reduzir na propoção certa
      const width = img.width;
      const height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      //definimos tamanho do canvas no mesmo tamanho que a imagem já reduzida
      canvas.width = width;
      canvas.height = height;
      //pegamos o contexto do canvas
      const ctx = canvas.getContext("2d");

      //desenhamos a nova imagem passando a imagem, a posição de inicio e o tamanho
      ctx.drawImage(img, 0, 0, width, height);

      //aqui é onde a magia acontece,

      // primeiro convertemos a imagem desenhada pelo canvas para o formato Blob
      // o primeiro parametro é a função de callback que ele irá chamar após converte,
      // o segundo o type da imagem
      // e o terceiro é a qualidade variando de 0 a 1
      ctx.canvas.toBlob(createFileFromBlob, image.type, 0.8);
    };
  };

  reader.readAsDataURL(image);
}
