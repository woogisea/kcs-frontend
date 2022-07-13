import React, { useState } from 'react';
import styled from 'styled-components';
import AddStudyContainer from '../../containers/main/AddStudyContainer';
import MainItemContainer from '../../containers/main/MainItemContainer';
import { useNavigate } from 'react-router-dom';
import StudyCategoryContainer from '../../containers/categories/StudyCategoryContainer';

const WholeWrapper = styled.div`
  display: flex;
`;
const MainItemListBlock = styled.div`
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-top: 84px;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

function MainItemList({ userRes, listRes }) {
  const [isOpenStudy, setIsOpenStudy] = useState(false);
  const navigate = useNavigate();
  const onOpenStudy = () => {
    setIsOpenStudy(!isOpenStudy);
  };

  const onMoveStudyInfo = (studyId) => {
    if (userRes) {
      navigate(`/study/info/${studyId}`);
    } else {
      alert('로그인 후 이용하실 수 있습니다.');
    }
  };
  return (
    <WholeWrapper>
      <StudyCategoryContainer onOpenStudy={onOpenStudy} />
      <MainItemListBlock>
        {isOpenStudy && <AddStudyContainer onOpenStudy={onOpenStudy} />}
        {listRes &&
          (listRes.content.length === 0 ? (
            <span>스터디 목록이 없습니다.</span>
          ) : (
            listRes.content.map((list) => (
              <MainItemContainer
                key={list.id}
                onclick={() => onMoveStudyInfo(list.id)}
              />
            ))
          ))}
      </MainItemListBlock>
    </WholeWrapper>
  );
}

export default MainItemList;
