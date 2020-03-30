import React from "react";
import resize from "./resize";

function App() {
  const callback = image => {

    //criando um formData para upload do arquivo
    const formData = new FormData();
    formData.append("image", image);
    //axios post para alguma url
    axios
      .post(url, formData)
      .then(e => console.log("Success"))
      .catch(e => console.log(e));
  };

  const handleOnChange = e => {
    const files = e.target.files;
    if (files.lentgh === 0) {
      return; // se não selecionar nenhum file
    }
    //funcao de resize
    resize(image, callback);
  };

  return (
    <div>
      <input type="file" accept="image/*," onChange={handleOnChange} />
    </div>
  );
}

export default App;
