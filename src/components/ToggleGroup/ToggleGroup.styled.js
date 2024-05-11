import styled from "styled-components";
import * as TG from '@radix-ui/react-toggle-group';
import { Colors } from "@utils/Helpers";

export const Root = styled(TG.Root)`
  display: inline-flex;
  background-color: transparent;
  border-radius: 4px;
`

export const Item = styled(TG.Item)`
  background-color: ${Colors.gray700};
  height: 3rem;
  width: 3rem;
  display: flex;
  font-size: 1.5rem;
  align-items: center;
  justify-content: center;
  color: ${Colors.gray100};
  border: none;
  cursor: pointer;

  &:first-child {
    margin-left: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &:hover {
    background-color: ${Colors.gray600};
  }

  &[data-state="on"] {
    background-color: ${Colors.orange500};
    color: ${Colors.orange100};
  }
`