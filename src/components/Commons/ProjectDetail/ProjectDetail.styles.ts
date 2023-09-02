import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, position, text } from "~/styles/mixins";
import { colors } from "~/styles/theme/colors";
import { hexToRgba } from "~/styles/utils";

export const Container = styled.div`
  position: relative;

  height: 99px;

  ${({ theme: { colors } }) => css`
    background-image: linear-gradient(
      180deg,
      rgba(34, 34, 34, 0) 0%,
      rgba(34, 34, 34, 0.57) 58.85%,
      rgba(34, 34, 34, 0.81) 92.71%,
      ${colors.backgroundSecondary} 100%
    );
  `}
`;

export const BlurChip = styled.span`
  ${position.absolute({ bottom: 24, right: 34 })};

  padding: 10px 16px;

  ${({ theme: { colors } }) => css`
    background-color: ${hexToRgba(colors.gray3, 0.3)};
    backdrop-filter: blur(5px);
  `};

  border-radius: 30px;

  ${text("textSmallRegular")};
  color: ${colors.content3};
`;

export const UserBox = styled.div`
  ${position.absolute({ bottom: 24, left: 34 })};

  ${flex({ align: "center", gap: 8 })}
`;

export const DateBox = styled.div`
  ${({ theme: { colors } }) => css`
    background-color: ${colors.backgroundPrimary};
  `}
`;
