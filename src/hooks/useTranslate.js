import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const useTranslate = () => {
  const [data, setData] = useState([]);
  const [dataTra, setDataTra] = useState('');
  const [textArea, setTextArea] = useState([]);
  const [selectBefore, setSelectBefore] = useState('');
  const [selectAfter, setSelectAfter] = useState('[]');

  const url = 'https://text-translator2.p.rapidapi.com';

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '666c2e84d7mshc25cebd4090c0bap1acb93jsn47fbed07955c',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
      },
    };

    fetch(`${url}/getLanguages`, options)
      .then((response) => response.json())
      .then(({ data }) => setData(data.languages))
      .catch((err) => console.error(err));
  }, []);

  const handleOnChange = (e) => {
    const { value } = e.target;
    setTextArea(value);
  };
  const handleOnChangeSelecBefore = (e) => {
    const { value } = e.target;
    setSelectBefore(value);
  };
  const handleOnChangeSelectAfter = (e) => {
    const { value } = e.target;
    setSelectAfter(value);
  };

  const handleOnClick = () => {
    if (selectBefore.length > 0 && selectAfter.length > 0) {
      if (textArea.length > 0) {
        const encodedParams = new URLSearchParams();
        encodedParams.append('source_language', selectBefore);
        encodedParams.append('target_language', selectAfter);
        encodedParams.append('text', textArea);

        const options = {
          method: 'POST',
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key':
              '666c2e84d7mshc25cebd4090c0bap1acb93jsn47fbed07955c',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
          },
          body: encodedParams,
        };

        fetch(`${url}/translate`, options)
          .then((response) => response.json())
          .then(({ data }) => {
            setDataTra(data.translatedText);
          })
          .catch((err) => console.error(err));
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Digite texto a traducir!',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Seleccione los idiomas!',
        showConfirmButton: false,
        timer: 1000
      })
    }
  };

  return {
    data,
    dataTra,
    handleOnChange,
    handleOnChangeSelecBefore,
    handleOnChangeSelectAfter,
    handleOnClick,
  };
};

export default useTranslate;
