import styled from "styled-components";
import * as Switch from '@radix-ui/react-switch';
import { Colors } from '@utils/Helpers';

export const SwitchContainer = styled.div`
   display: flex;
   align-items: center;
`

export const SwitchRoot = styled(Switch.Root)`
   all: unset;
  width: 60px;
  height: 25px;
  background-color: ${Colors.gray600};
  border-radius: 3rem;
  position: relative;
  cursor: pointer;
  
  &:focus {
    border: none;
    outline: none;
    box-shadow: 0 0 0 1px ${Colors.orange100};
  }

  &[data-state="checked"] {
    background-color: ${Colors.orange500};
  }
`

export const SwitchThumb = styled(Switch.Thumb)`
  display: block;
  width: 21px;
  height: 21px;
  background-color: ${Colors.orange100};
  border-radius: 9999px;
  transition: transform 100ms;
  transform: translateX(2px);
  will-change: transform;

  &[data-state="checked"] {
    transform: translateX(25px);
  }
`
