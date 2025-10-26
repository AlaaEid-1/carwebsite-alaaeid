import { NextRequest, NextResponse } from 'next/server';

// Predefined responses for common car-related questions
const responses = {
  greeting: [
    "Hello! Welcome to AlaaEid Car Explorer. How can I help you find your perfect car today?",
    "Hi there! I'm here to help you explore our amazing car collection. What are you looking for?",
    "Welcome! Ready to discover some incredible vehicles? Let me know how I can assist you."
  ],
  pricing: [
    "Our cars range from affordable options starting at $15,000 to luxury vehicles up to $200,000+. What price range are you interested in?",
    "We have vehicles for every budget! From compact cars under $20,000 to premium models over $100,000. What's your budget?",
    "Pricing varies by make and model. We offer competitive prices with financing options available. What type of vehicle interests you?"
  ],
  testDrive: [
    "Great! You can schedule a test drive directly through our website. Just browse our cars and click the 'Schedule Test Drive' button.",
    "Test drives are available for most vehicles. Visit our test drives page or contact us to arrange one. We recommend booking in advance!",
    "We'd love for you to test drive one of our cars! You can schedule through the website or give us a call. What vehicle caught your eye?"
  ],
  contact: [
    "You can reach our sales team at (555) 123-CARS or email us at sales@alaacar.com. We're here to help!",
    "Feel free to contact us anytime! Our team is ready to assist with your car needs.",
    "We're here to help! Contact our sales team for personalized assistance with your car search."
  ],
  default: [
    "That's an interesting question! Our team specializes in helping you find the perfect vehicle. Can you tell me more about what you're looking for?",
    "I'd be happy to help you explore our car options. What type of vehicle are you interested in - sedan, SUV, sports car, or something else?",
    "Let me help you find what you need! Are you looking for a specific make, model, or type of vehicle?",
    "I'm here to assist with your car shopping needs. Whether you're looking for reliability, performance, or luxury, we have options for you!"
  ]
};

function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}

function classifyMessage(message: string): keyof typeof responses {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return 'greeting';
  }
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('budget') || lowerMessage.includes('expensive')) {
    return 'pricing';
  }
  if (lowerMessage.includes('test drive') || lowerMessage.includes('drive') || lowerMessage.includes('schedule')) {
    return 'testDrive';
  }
  if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
    return 'contact';
  }

  return 'default';
}

export async function POST(request: NextRequest) {
  try {
    const { message, user } = await request.json();

    if (!message || !user) {
      return NextResponse.json({ error: 'Message and user are required' }, { status: 400 });
    }

    const category = classifyMessage(message);
    const botResponse = getRandomResponse(responses[category]);

    return NextResponse.json({ response: botResponse });
  } catch (error) {
    console.error('Chatbot API error:', error);
    return NextResponse.json({
      response: "I'm experiencing technical difficulties. Please contact our support team for assistance."
    }, { status: 500 });
  }
}
