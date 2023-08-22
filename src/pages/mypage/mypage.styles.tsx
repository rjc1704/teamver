import styled from "@emotion/styled";
import { flex, size } from "~/styles/mixins";

export const Container = styled.div`
  ${flex.column({ gap: 15, align: "center" })};
  ${size({ width: "100%", maxWidth: 375, minHeight: "100vh" })};
  margin: 0 auto;

  border: 1px solid black;
`;

export const LikeUsersButtonContainer = styled.div`
  ${flex({ justify: "start" })};
  ${size({ width: "100%" })};
  padding: 15px;
  background-color: #f0f0f0;
`;

export const ProceedingProjectContainer = styled.div`
  ${flex.column({ align: "start", gap: 10 })}
  ${size({ width: "100%" })}
  padding: 0 15px;
`;

export const ProceedingProjectCard = styled.div`
  ${flex({ justify: "between", align: "center" })}
  ${size({ width: "100%" })}
  padding: 10px;
  background-color: #d9d9d9;
`;

export const ReceivedRecommendContainer = styled.div`
  ${flex.column({ align: "start", gap: 10 })}
  ${size({ width: "100%" })}
  padding: 0 15px;
`;

export const RecommendCard = styled.div`
  ${flex.column({ align: "start", gap: 10 })}
  ${size({ width: "100%" })}
  padding: 10px;
  background-color: #d9d9d9;
`;

export const PreviousProjectContainer = styled.div`
  ${flex.column({ align: "start", gap: 10 })}
  ${size({ width: "100%" })}
  padding: 0 15px;
`;

export const PreviousProjectCard = styled.div`
  ${flex({ justify: "between", align: "center" })}
  ${size({ width: "100%" })}
  padding: 10px;
  background-color: #d9d9d9;
`;
