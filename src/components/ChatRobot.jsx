import { useState, useRef, useEffect } from "react";
import { Chatbot } from "supersimpledev";
import RobotImage from "../assets/other-images/robot.png";
import UserImage from "../assets/other-images/user.png";
import LoadingSpinner from "../assets/other-images/loading-spinner.gif";
import "../index.css";

function ChatRobot() {
  const [chatMessages, setChatMessages] = useState([
    // {
    //   id: crypto.randomUUID(),
    //   message: "Hello",
    //   sender: "user",
    // },
    // {
    //   id: crypto.randomUUID(),
    //   message: "Hi, How are you?",
    //   sender: "robot",
    // },
    // {
    //   id: crypto.randomUUID(),
    //   message: "Hello",
    //   sender: "user",
    // },
    // {
    //   id: crypto.randomUUID(),
    //   message: "Hi, How are you?",
    //   sender: "robot",
    // },
  ]);

  useEffect(() => {

    Chatbot.addResponses({
      "I am fine": "That's great to hear! How can I assist you today?",
      "What is your name?":
        "I am your virtual assistant, here to help you with any questions you may have.",
      "hi": "Hello, How may I help you?",
      "I need your help":
        "Of course! I'm here to assist you. What do you need help with concerning using our platform?",
      "What can you do?":
        "I can help you with product information, order tracking, and general inquiries about our services.",
      "What is your purpose?":
        "My purpose is to assist you and provide information about our products and services.",
      "How can I contact support?":
        "You can contact our support team by emailing, or calling our customer service number. You can also visit our 'Contact Us' page for more details.",
      "What are your hours of operation?":
        "Our customer service team is available 24/7 to assist you with any inquiries.",
      "What is your return policy?":
        "We offer a 30-day return policy on most items. Please visit our 'Returns & Exchanges' page for more details.",
      "How do I track my order?":
        "You can track your order by visiting the 'Order Tracking' page on our website and entering your tracking information.",
      "What payment methods do you accept?":
        "We accept various payment methods including credit cards, debit cards, and Mobile Money.",
      "How do I place an order?":
        "To place an order, simply browse our products, add items to your cart, and proceed to checkout. Follow the prompts to complete your purchase.",
      "What is your shipping policy?":
        "We offer free shipping on all orders over $50. Standard shipping usually takes 5-7 business days.",
      "Can I change my order after placing it?":
        "Once an order is placed, it cannot be changed. However, you can cancel your order within 30 minutes of placing it by contacting our support team.",
      "How do I reset my password?":
        "To reset your password, go to the 'Forgot Password' page and follow the instructions to reset it.",
      "What is your privacy policy?":
        "We take your privacy seriously. Please visit our 'Privacy Policy' page for detailed information on how we collect, use, and protect your personal data.",
      "What is your refund policy?":
        "We offer a 30-day refund policy on most items. Please visit our 'Returns & Exchanges' page for more details.",
      "How do I unsubscribe from emails?":
        "To unsubscribe from our emails, click the 'Unsubscribe' link at the bottom of any email you receive from us, or visit the 'Email Preferences' page on our website.",
      "What is your warranty policy?":
        "We offer a 1-year warranty on all our products. Please visit our 'Warranty Policy' page for more details.",
      "How do I leave a review?":
        "To leave a review, go to the product page of the item you purchased and scroll down to the 'Reviews' section. Click on 'Write a Review' and share your feedback.",
      "How do I book a tailoring appointment?":
        "To book a tailoring appointment, please visit our 'Tailoring Services' page and fill out the appointment form. Our team will get back to you to confirm your booking.",
      "What is your tailoring service?":
        "Our tailoring service offers personalized adjustments and custom fittings to ensure the perfect fit for your garments.",
      "Yes I do": "Great! How can I assist you with your tailoring needs?",
      "No I don't": "No problem! If you have any other questions, feel free to ask.",
      "I have a question": "Sure! What is your question?",
      "I want to know more about your products": "Of course! What specific product would you like to know more about?",
      "Who created you?":
        "I was created by the team at Creative Capital powered by Supersimpledev, who designed me to assist users like you with their inquiries and provide helpful information.",
      "What is your favorite color?":
        "As a robot, I don't have personal preferences, but I can help you find products in any color you like.",
      "Who made you?":
        "I was created by the team at Creative Capital powered by Supersimpledev, who designed me to assist users like you with their inquiries and provide helpful information.",
      "who are you?":
        "I am your virtual assistant, designed to help you with any questions you may have about our products and services.",
      "How do I sell a product?":
        "To sell a product, please create an account as a seller, visit our 'Sell Products' page and fill out the form with the necessary details. Our team will review your submission and get back to you.",
      "What are your terms and conditions?":
        "Our terms and conditions outline the rules and guidelines for using our platform. Please visit our 'Terms and Conditions' page for more information."
    });
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  function toggleChatMenu() {
    setIsOpen(isOpen === false ? true : false);
  }

  const [inputText, setInputText] = useState("");

  function handleInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    const newMessages = [
      ...chatMessages,
      {
        id: crypto.randomUUID(),
        message: inputText,
        sender: "user",
      },
    ];

    setChatMessages(newMessages);

    // Empty the input
    setInputText("");

    // Wait for the chatbot to respond
    setChatMessages([
      ...newMessages,
      {
        id: crypto.randomUUID(),
        message: <img src={LoadingSpinner} className="h-6 w-6" />,
        sender: "robot",
      },
    ]);

    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessages([
      ...newMessages,
      {
        id: crypto.randomUUID(),
        message: response,
        sender: "robot",
      },
    ]);
  }

  // Send message with enter key
  function sendWithEnterkey(event) {
    event.key === "Enter" ? sendMessage() : undefined;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat toggle button */}
      <button
        className="border py-2.5 px-3 rounded-full rounded-br-3xl fixed bg-green-500 bottom-16 right-8 sm:bottom-20 sm:right-16 z-50 text-white hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={toggleChatMenu}
      >
        <i className="fas fa-robot text-xl"></i>
      </button>

      {/* Chat container */}
      <div
        className={`${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        } 
        origin-bottom-right absolute sm:bottom-16 sm:right-12 bottom-12 right-4 [@media(max-width:360px)]:w-72 w-80 bg-white rounded-xl shadow-2xl 
        transform transition-all duration-200`}
      >
        {/* Chat header */}
        <div className="p-2 border-b border-gray-200 bg-blue-600 rounded-t-xl">
          <p className="text-center font-bold text-white">
            Hi <i className="fas fa-hand text-yellow-500"></i>, Talk to our
            Assistant
          </p>
        </div>

        {/* Messages container - Add these styles */}
        <div className="p-4 h-[400px] overflow-y-scroll chatbot-container">
          <ChatMessages chatMessages={chatMessages} />
        </div>

        {/* Input section */}
        <div className="border-t border-gray-200">
          <div className="p-2 flex space-x-1">
            <input
              type="text"
              className="border-b border-gray-300 focus:outline-none w-2/3 placeholder:text-sm hover:border-blue-300 focus:border-blue-500 transition p-1 rounded text-sm h-8"
              onChange={handleInputText}
              value={inputText}
              onKeyDown={sendWithEnterkey}
              placeholder="How may I help you?"
            />
            <button
              className="border border-gray-300 px-1 text-purple-600 bg-white rounded px-3 hover:bg-gray-50 transition-all h-8"
              type="button"
              onClick={sendMessage}
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatMessage({ message, sender }) {
  return (
    <div
      className={`flex items-start ${
        sender === "user" ? "chat-message justify-end" : "robot-chat"
      }`}
    >
      {sender === "robot" && <img src={RobotImage} className="w-8" />}
      <div
        className={`chat-message-text text-sm my-1 ${
          sender === "user" ? "bg-gray-200 mr-2" : "bg-green-200 ml-2"
        } rounded-lg px-2 py-1 flex flex-col`}
      >
        {message}
      </div>
      {sender === "user" && <img src={UserImage} className="w-8" />}
    </div>
  );
}

function ChatMessages({ chatMessages }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [chatMessages]);

  if (chatMessages.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No messages yet
        <p>Feel free to ask me anything!</p>
      </div>
    );
  }

  return (
    <div
      className="chat-messages-container flex flex-col h-full overflow-y-auto"
      ref={scrollRef}
    >
      {chatMessages.map((chatMessage) => (
        <ChatMessage
          key={chatMessage.id}
          message={chatMessage.message}
          sender={chatMessage.sender}
        />
      ))}
    </div>
  );
}

export default ChatRobot;
