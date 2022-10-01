import React from 'react';
import useTranslate from './hooks/useTranslate';
import './App.css';

function App() {
  const {
    data,
    dataTra,
    handleOnChange,
    handleOnChangeSelecBefore,
    handleOnChangeSelectAfter,
    handleOnClick,
  } = useTranslate();

  return (
    <main>
      <section className='translContainer'>
        <h2>Traductor App</h2>

        <div className='translBody'>
          <div className='translBefore'>
            <select onChange={handleOnChangeSelecBefore}>
              <option value=''></option>
              {data.map((item) => {
                return (
                  <option key={item.code} value={item.code}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <textarea onChange={handleOnChange} name='' id=''></textarea>
          </div>

          <div className='translAfter'>
            <select onChange={handleOnChangeSelectAfter}>
              <option value=' '></option>
              {data.map((item) => {
                return (
                  <option key={item.code} value={item.code}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <textarea disabled value={dataTra}></textarea>
          </div>
        </div>
        <div className='tranlsButton'>
          <button onClick={handleOnClick}>Traducir</button>
        </div>
      </section>
    </main>
  );
}

export default App;
