import React, { useEffect } from 'react';
import styled from 'styled-components';

const Admin: React.FC = () => {
  const columns = ['', 'Userid', 'Auth', 'Nickname'];
  const data = [
    {
      userid: 'admin',
      auth: 'Admin',
      nickname: 'admin',
    },
    {
      userid: 'testid2',
      auth: 'Guest',
      nickname: '테스트아이디2',
    },
    {
      userid: 'testid3',
      auth: 'Guest',
      nickname: '테스트아이디3',
    },
    {
      userid: 'testid4',
      auth: 'Guest',
      nickname: '테스트아이디4',
    },
    {
      userid: 'testid5',
      auth: 'Guest',
      nickname: '테스트아이디5',
    },
    {
      userid: 'testid6',
      auth: 'Guest',
      nickname: '테스트아이디6',
    },
    {
      userid: 'testid7',
      auth: 'Guest',
      nickname: '테스트아이디7',
    },
    {
      userid: 'testid8',
      auth: 'Guest',
      nickname: '테스트아이디8',
    },
  ];
  useEffect(() => {
    fetch(`${process.env.REACT_APP_ALG_SERVER}/admin/user`, {
      // credentials: "include",
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then(response => {
        console.log(response.body);
      })
      .catch(error => console.log('error', error));
  }, []);
  return (
    <Feed>
      <Box>
        <Slogan>관리자 모드</Slogan>
      </Box>
      <Container>
        <Title>회원 관리</Title>
        <Table>
          <thead>
            <tr>
              {columns.map(column => (
                <Th key={column}>{column}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(({ userid, auth, nickname }) => (
              <tr key={userid}>
                <Td>
                  <Edit>수정</Edit>
                </Td>
                <Td>{userid}</Td>
                <Td>{auth}</Td>
                <Td>{nickname}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Feed>
  );
};

export default Admin;

const Feed = styled.div`
  width: 100%;
`;
const Box = styled.div`
  background-color: ${props => props.theme.color.agGray};
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Slogan = styled.p`
  font-size: 64px;
  font-weight: 300;
  margin: 1rem;
`;
const Container = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.p`
  font-size: 32px;
  font-weight: 400;
  margin-bottom: 20px;
`;
const Table = styled.table`
  border-collapse: collapse;
  font-size: 20px;
`;
const Th = styled.th`
  padding: 10px 60px;
  font-weight: 700;
  border: 1px solid black;
  background-color: ${props => props.theme.color.agMint};
`;
const Td = styled.td`
  padding: 10px 20px;
  border: 1px solid black;
`;
const Edit = styled.p`
  background-color: ${props => props.theme.color.agBlue};
  opacity: 0.8;
  color: white;
  width: 50px;
  border-radius: 10px;
  padding: 5px;
  text-align: center;
  box-shadow: 0px 1px 1px 1px #00000025;
`;
