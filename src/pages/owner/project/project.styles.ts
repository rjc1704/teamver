import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { FlexColumn, flex, position, selector, size } from "~/styles/mixins";

export const Header = styled.header`
  ${flex.center()};

  ${({ theme: { sizes } }) => css`
    height: ${sizes.height.header}px;
  `}
`;
export const ProfileBox = styled.div`
  ${flex.column({ align: "center", gap: 12 })};
`;
export const ProfileImage = styled.img`
  ${size({ width: 64, height: 64 })};

  border-radius: 50%;
`;

export const Category = styled.div`
  ${flex.center()};

  width: 50%;

  padding-bottom: 12px;

  ${({ theme: { colors } }) => css`
    border-bottom: 1px solid transparent;
    ${selector("borderColor", { hover: colors.white })};
  `}
  transition: border-color 0.3s ease-in-out;
`;

export const ProjectBox = styled(FlexColumn)`
  padding: 18px 33px;
`;

export const ImageUploadButton = styled.div`
  ${position.fixed({ right: 28, bottom: 28 })};

  ${flex.center()};

  ${size({ width: 44, height: 44 })};

  ${({ theme: { colors } }) => css`
    background-color: ${colors.primary1};
  `}

  border-radius: 50%;
`;
