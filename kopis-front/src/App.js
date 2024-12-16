import './App.css';
import axios from 'axios';
import {useState,useEffect} from 'react';
function App() {
  const [board,setBoard] = useState([]);
  const [performance,setPerformance] = useState([]);
  const [target, setTarget] = useState({
    bno: '',
    title: '',
    content: ''
  });


  const api_url = process.env.REACT_APP_API_URL || 'http://localhost:8082';
  const env = process.env.REACT_APP_ENV_MODE || 'Local';

  const getBoard = async () => {
      try{
          const res = await axios.get(api_url+'/board');
          if(res != null){
              console.log(res.data);
              setBoard(res.data)
          }
      }catch(error){
          console.log(error.messages);
      }
  };

    const getPerformance = async () => {
        try{
            const res = await axios.get(api_url+'/performance/findAll');
            if(res != null){
                console.log(res.data);
                setPerformance(res.data)
            }
        }catch(error){
            console.log(error.messages);
        }
    };

  const deleteBoard = async (bno) =>{
    const res = await axios.post(api_url+'/board/delete',{bno: bno});
    if(res != null){
      console.log("삭제 성공", bno);
      await getBoard();
    }
  }

  const registerBoard = async() =>{

    // validation
    if(target.title === '' || target.title === null ){
      alert("제목을 입력해주세요");
      return;
    }
    if(target.content === '' || target.content === null){
      alert("내용을 입력해주세요");
      return;
    }

    const res = await axios.post(api_url+'/board/register',target);
    if(res != null){
      console.log("등록 성공", target);
      await getBoard();
      setTarget({
        bno: '',
        title: '',
        content: ''
      })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTarget({
      ...target,
      [name]: value,
    });
  };

  useEffect(()=>{
    console.log("Mode:"+env+", API URL:"+api_url);
    getBoard();
    getPerformance();
  },[]);

  return (
      <div className="App">
          <div
              style={{
                  margin: '20px auto',
                  width: '100%',
                  maxWidth: '800px',
                  overflow: 'hidden',
                  fontSize: 'larger'
              }}>
              <div>{env}</div>
              <div>{api_url}</div>
          </div>
          <div
              style={{
                  margin: '20px auto',
                  width: '100%',
                  maxWidth: '800px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
              }}
          >
              <table style={{width: '100%', borderCollapse: 'collapse'}}>
                  <thead>
                  <tr style={{backgroundColor: '#f4f4f4', textAlign: 'center'}}>
                      <th style={{padding: '10px', borderBottom: '1px solid #ddd'}}>Bno</th>
                      <th style={{padding: '10px', borderBottom: '1px solid #ddd'}}>Title</th>
                      <th style={{padding: '10px', borderBottom: '1px solid #ddd'}}>Content</th>
                      <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                      board && board.length === 0 ?
                          (<tr style={{borderBottom: '1px solid #ddd'}}>
                              <td colSpan={4} style={{padding: '10px', verticalAlign: 'center'}}>
                                  게시글이 없습니다
                              </td>
                          </tr>) : null
                  }
                  {board && board.map((item) => (
                      <tr key={item.bno} style={{borderBottom: '1px solid #ddd'}}>
                          <td style={{padding: '10px'}}>{item.bno}</td>
                          <td style={{padding: '10px'}}>{item.title}</td>
                          <td style={{padding: '10px'}}>{item.content}</td>
                          <td style={{padding: '10px', textAlign: 'center'}}>
                              <button
                                  onClick={() => deleteBoard(item.bno)}
                                  style={{
                                      padding: '5px 10px',
                                      backgroundColor: '#ff4d4d',
                                      color: 'white',
                                      border: 'none',
                                      borderRadius: '5px',
                                      cursor: 'pointer',
                                  }}
                              >
                                  삭제
                              </button>
                          </td>
                      </tr>
                  ))}
                  </tbody>
              </table>
          </div>
          <div
              style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '10px'
              }}
          >
              <div
                  style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '15px',
                      width: '70%',
                      maxWidth: '500px',
                      backgroundColor: 'white',
                      padding: '20px',
                      borderRadius: '10px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  }}
              >
                  {/* Title Field */}
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', width: '100%'}}>
                      <label htmlFor="title" style={{flex: '0 0 20%'}}>Title:</label>
                      <input
                          type="text"
                          id="title"
                          name="title"
                          value={target.title}
                          onChange={handleChange}
                          placeholder="제목을 입력해주세요."
                          style={{flex: '1', padding: '5px'}}
                      />
                  </div>

                  {/* Content Field */}
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', width: '100%'}}>
                      <label htmlFor="content" style={{flex: '0 0 20%'}}>Content:</label>
                      <input
                          type="text"
                          id="content"
                          name="content"
                          value={target.content}
                          onChange={handleChange}
                          placeholder="내용을 입력해주세요."
                          style={{flex: '1', padding: '5px'}}
                      />
                  </div>

                  {/* Submit Button */}
                  <button
                      type="button"
                      onClick={() => registerBoard()}
                      style={{
                          padding: '10px 15px',
                          backgroundColor: 'blue',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          marginTop: '5px',
                      }}
                  >
                      등록
                  </button>
              </div>
          </div>
          <div
              style={{
                  margin: '20px auto',
                  width: '100%',
                  maxWidth: '1200px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
              }}
          >
              <table style={{width: '100%', borderCollapse: 'collapse'}}>
                  <thead>
                  <tr style={{backgroundColor: '#f4f4f4', textAlign: 'center'}}>
                      <th style={{padding: '10px', borderBottom: '1px solid #ddd'}}>공연ID</th>
                      <th style={{padding: '10px', borderBottom: '1px solid #ddd'}}>공연명</th>
                      <th style={{padding: '10px', borderBottom: '1px solid #ddd'}}>공연종류</th>
                      <th style={{padding: '10px', borderBottom: '1px solid #ddd'}}>가격</th>
                      <th style={{padding: '10px', borderBottom: '1px solid #ddd'}}>작가</th>
                      <th style={{padding: '10px', borderBottom: '1px solid #ddd'}}>zip</th>
                      <th style={{padding: '10px', borderBottom: '1px solid #ddd'}}>공연장주소</th>
                      <th style={{padding: '10px', borderBottom: '1px solid #ddd'}}>시작날짜</th>
                      <th style={{padding: '10px', borderBottom: '1px solid #ddd'}}>종료날짜</th>
                      <th style={{padding: '10px', borderBottom: '1px solid #ddd'}}></th>
                      <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                      performance && performance.length === 0 ?
                          (<tr style={{borderBottom: '1px solid #ddd'}}>
                              <td colSpan={4} style={{padding: '10px', verticalAlign: 'center'}}>
                                  게시글이 없습니다
                              </td>
                          </tr>) : null
                  }
                  {performance && performance.map((item) => (
                      <tr key={item.bno} style={{borderBottom: '1px solid #ddd'}}>
                          <td style={{padding: '10px'}}>{item.prfId}</td>
                          <td style={{padding: '10px'}}>{item.prfNm}</td>
                          <td style={{padding: '10px'}}>{item.prfType}</td>
                          <td style={{padding: '10px'}}>{item.price}</td>
                          <td style={{padding: '10px'}}>{item.author}</td>
                          <td style={{padding: '10px'}}>{item.zip}</td>
                          <td style={{padding: '10px'}}>{item.addr}</td>
                          <td style={{padding: '10px'}}>{item.startdate}</td>
                          <td style={{padding: '10px'}}>{item.enddate}</td>
                          <td style={{padding: '10px', textAlign: 'center'}}>
                              <button
                                  onClick={() => deleteBoard(item.prfId)}
                                  style={{
                                      padding: '5px 10px',
                                      backgroundColor: '#f0f0f0',
                                      color: 'white',
                                      border: 'none',
                                      borderRadius: '5px',
                                      cursor: 'pointer'
                                  }}
                                  disabled
                              >
                                  삭제
                              </button>
                          </td>
                      </tr>
                  ))}
                  </tbody>
              </table>
          </div>
      </div>
  );
}

export default App;
