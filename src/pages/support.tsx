import React from "react";
import { Header } from "../components/header";
import { Card, Input, Button, TextArea, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function Support() {
  const [selected, setSelected] = React.useState("contact");

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Support" />
      
      <div className="p-6">
        <Card className="bg-gray-900 border border-gray-800 mb-6">
          <Card.Content>
            <Tabs 
              aria-label="Support options" 
              selectedKey={selected} 
              onSelectionChange={setSelected as any}
              color="primary"
              variant="underlined"
            >
              <Tab key="contact" title="Contact Support" />
              <Tab key="tickets" title="My Tickets" />
              <Tab key="knowledge" title="Knowledge Base" />
            </Tabs>
          </Card.Content>
        </Card>
        
        {selected === "contact" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-900 border border-gray-800 lg:col-span-2">
              <Card.Content>
                <h3 className="text-lg font-medium text-white mb-6">Submit a Support Request</h3>
                
                <div className="space-y-4">
                  <div>
                    <Input
                      label="Subject"
                      placeholder="Enter the subject of your inquiry"
                      variant="bordered"
                      labelPlacement="outside"
                      className="bg-gray-900"
                    />
                  </div>
                  
                  <div>
                    <Input
                      label="Email"
                      placeholder="Your email address"
                      variant="bordered"
                      labelPlacement="outside"
                      className="bg-gray-900"
                    />
                  </div>
                  
                  <div>
                    <div className="block mb-2 text-sm font-medium text-white">Category</div>
                    <select className="bg-gray-900 border border-gray-700 rounded-lg w-full p-2.5 text-white">
                      <option value="">Select a category</option>
                      <option value="tech">Technical Issue</option>
                      <option value="billing">Billing Question</option>
                      <option value="account">Account Management</option>
                      <option value="feature">Feature Request</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <TextArea
                      label="Message"
                      placeholder="Please describe your issue in detail"
                      variant="bordered"
                      labelPlacement="outside"
                      minRows={4}
                      className="bg-gray-900"
                    />
                  </div>
                  
                  <div>
                    <div className="block mb-2 text-sm font-medium text-white">Attachments</div>
                    <Button variant="flat">
                      <Icon icon="lucide:upload" slot="start" />
                      Upload Files
                    </Button>
                  </div>

                  <div className="flex justify-end">
                    <Button color="primary">
                      <Icon icon="lucide:send" slot="start" />
                      Submit Ticket
                    </Button>
                  </div>
                </div>
              </Card.Content>
            </Card>
            
            <div className="space-y-6">
              <Card className="bg-gray-900 border border-gray-800">
                <Card.Content>
                  <h3 className="text-lg font-medium text-white mb-4">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-900/30 flex items-center justify-center">
                        <Icon icon="lucide:mail" className="text-primary-500" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Email</div>
                        <div className="text-white">support@megabuild.com</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-900/30 flex items-center justify-center">
                        <Icon icon="lucide:phone" className="text-primary-500" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Phone</div>
                        <div className="text-white">+1 (555) 123-4567</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-900/30 flex items-center justify-center">
                        <Icon icon="lucide:clock" className="text-primary-500" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Hours</div>
                        <div className="text-white">Mon-Fri: 9AM - 5PM</div>
                      </div>
                    </div>
                  </div>
                </Card.Content>
              </Card>
              
              <Card className="bg-gray-900 border border-gray-800">
                <Card.Content>
                  <h3 className="text-lg font-medium text-white mb-4">Support Level</h3>
                  
                  <div className="p-3 border border-primary-600 bg-primary-900/20 rounded-lg mb-4">
                    <div className="text-white font-medium">Premium Support</div>
                    <div className="text-sm text-gray-300 mt-1">You have premium support with priority response</div>
                  </div>
                  
                  <div className="text-sm text-gray-400">
                    Average response time: <span className="text-green-500 font-medium">4 hours</span>
                  </div>
                </Card.Content>
              </Card>
            </div>
          </div>
        )}
        
        {selected === "tickets" && (
          <div className="text-center py-12">
            <Icon icon="lucide:ticket" className="text-5xl text-gray-400 mx-auto" />
            <div className="text-xl font-medium text-gray-300 mt-4">No active support tickets</div>
            <div className="text-sm text-gray-400 max-w-md mx-auto mt-2">
              You don't have any active support tickets. Create a new ticket to get help from our support team.
            </div>
            <Button color="primary" className="mt-6">
              <Icon icon="lucide:plus" slot="start" />
              Create New Ticket
            </Button>
          </div>
        )}
        
        {selected === "knowledge" && (
          <div className="text-center py-12">
            <Icon icon="lucide:book-open" className="text-5xl text-gray-400 mx-auto" />
            <div className="text-xl font-medium text-gray-300 mt-4">Knowledge Base Coming Soon</div>
            <div className="text-sm text-gray-400 max-w-md mx-auto mt-2">
              We're building a comprehensive knowledge base with articles, tutorials, and guides to help you get the most out of our platform.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}