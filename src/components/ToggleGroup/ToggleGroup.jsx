import * as S from "./ToggleGroup.styled";

function ToggleGroupRoot({children, type}) {
   return(
      <S.Root type={type}>
         {children}
      </S.Root>
   )
}

function ToggleGroupItem({children, dataState, onClick}) {
   if(dataState) {
      dataState = "on"
   }
   else {
      dataState = "off"
   }
   return(
      <S.Item data-state={dataState} onClick={onClick}>
         {children}
      </S.Item>
   )
}

const ToggleGroup = {
   Root: ToggleGroupRoot,
   Item: ToggleGroupItem
}

export default ToggleGroup;