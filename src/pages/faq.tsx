import React from "react";
import { Header } from "../components/header";
import { Card, CardBody, Input, Button, Accordion, AccordionItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { faqCategories } from "../data/mock-data";

export default function Faq() {
  const [searchText, setSearchText] = React.useState("");
  
  const filteredFaqs = React.useMemo(() => {
    if (!searchText) return faqCategories;
    
    const lowercaseSearch = searchText.toLowerCase();
    return faqCategories.map(category => {
      const filteredQuestions = category.questions.filter(
        question => 
          question.question.toLowerCase().includes(lowercaseSearch) || 
          question.answer.toLowerCase().includes(lowercaseSearch)
      );
      
      return {
        ...category,
        questions: filteredQuestions
      };
    }).filter(category => category.questions.length > 0);
  }, [searchText]);

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Frequently Asked Questions" />
      
      <div className="p-6">
        <Card className="bg-gray-900 border border-gray-800 mb-8">
          <CardBody className="text-center py-10">
            <h2 className="text-2xl font-bold text-white mb-4">How can we help you?</h2>
            <div className="max-w-lg mx-auto">
              <Input
                placeholder="Search for answers..."
                value={searchText}
                onValueChange={setSearchText}
                size="lg"
                startContent={<Icon icon="lucide:search" />}
                className="bg-gray-800"
              />
            </div>
          </CardBody>
        </Card>
        
        {filteredFaqs.map((category) => (
          <div key={category.id} className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">{category.name}</h3>
            <Accordion variant="splitted" className="mb-4">
              {category.questions.map((question) => (
                <AccordionItem 
                  key={question.id} 
                  title={question.question}
                  classNames={{
                    base: "bg-gray-900 border border-gray-800",
                    title: "text-white",
                    content: "text-gray-300"
                  }}
                >
                  <div className="px-2 py-2">{question.answer}</div>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
        
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-white mb-4">Still have questions?</h3>
          <p className="text-gray-400 mb-6">Can't find the answer you're looking for? Please contact our support team.</p>
          <Button color="primary" size="lg">
            <Icon icon="lucide:message-circle" className="mr-2" />
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}