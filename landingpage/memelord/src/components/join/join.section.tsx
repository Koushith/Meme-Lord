import { Heading, Paragraph } from "..";
import { JoinSectionContainer } from "./join.styles";

export const JoinNowSection = () => {
  return (
    <JoinSectionContainer>
      <Heading size={3.2} className="heading">
        Join the Meme Squad
      </Heading>
      <Paragraph className="sub-heading">
        Fed up of missing out on the freshest meme trends? Join our newsletter
        today and become an unstoppable force in the meme universe, because
        you're worth it.
      </Paragraph>

      <div className="input-container">
        <input type="email" placeholder="johndoe@gmail.com" className="email" />
        <button className="button">Join Now</button>
      </div>
    </JoinSectionContainer>
  );
};
