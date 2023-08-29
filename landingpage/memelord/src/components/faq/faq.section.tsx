import { Heading, Paragraph } from "..";
import { FAQContainer } from "./faq.styles";

export const FAQSection = () => {
  return (
    <FAQContainer>
      <Heading size={3.2} bold>
        MEME QUERIES
      </Heading>
      <div className="faq-lists">
        <div className="faq">
          <Paragraph bolder className="question">
            How do I prove meme ownership?
          </Paragraph>
          <Paragraph bold className="answer">
            Submit your meme creation to our platform will generate the proof
            for your genius.
          </Paragraph>
        </div>

        <div className="faq">
          <Paragraph bolder className="question">
            Who ranks the Leaderboard?
          </Paragraph>
          <Paragraph bold className="answer">
            The leaderboard ranks are determined by community votes and expert
            memeologist reviews.
          </Paragraph>
        </div>

        <div className="faq">
          <Paragraph bolder className="question">
            Can I collaborate with others?
          </Paragraph>
          <Paragraph bold className="answer">
            Absolutely! Connect, chat, and create with fellow memesters in our
            community. - coming soon
          </Paragraph>
        </div>
      </div>
    </FAQContainer>
  );
};
