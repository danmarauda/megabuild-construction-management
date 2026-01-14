import React from "react";
import { Header } from "../components/header";
import { Card, Tabs, Tab, Input, Button, Switch, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function Settings() {
  const [selected, setSelected] = React.useState("profile");

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Settings" />
      
      <div className="p-6">
        <Card className="bg-gray-900 border border-gray-800">
          <Card.Content>
            <Tabs 
              aria-label="Settings" 
              selectedKey={selected} 
              onSelectionChange={setSelected as any}
              color="primary"
              variant="underlined"
              className="mb-4"
            >
              <Tab key="profile" title="Profile" />
              <Tab key="company" title="Company" />
              <Tab key="notifications" title="Notifications" />
              <Tab key="security" title="Security" />
              <Tab key="billing" title="Billing" />
            </Tabs>
            
            {selected === "profile" && (
              <div>
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <div className="flex-shrink-0">
                    <div className="text-center">
                      <Avatar 
                        src="https://img.heroui.chat/image/avatar?w=150&h=150&u=jacob" 
                        className="w-32 h-32 mx-auto"
                      />
                      <Button variant="flat" size="sm" className="mt-4">
                        <Icon icon="lucide:upload" slot="start" />
                        Change Photo
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex-grow space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Input
                          label="First Name"
                          defaultValue="Jacob"
                          variant="bordered"
                          labelPlacement="outside"
                          className="bg-gray-900"
                        />
                      </div>
                      <div>
                        <Input
                          label="Last Name"
                          defaultValue="Jones"
                          variant="bordered"
                          labelPlacement="outside"
                          className="bg-gray-900"
                        />
                      </div>
                      <div>
                        <Input
                          label="Email"
                          defaultValue="jacob@example.com"
                          variant="bordered"
                          labelPlacement="outside"
                          className="bg-gray-900"
                        />
                      </div>
                      <div>
                        <Input
                          label="Phone"
                          defaultValue="555-1007"
                          variant="bordered"
                          labelPlacement="outside"
                          className="bg-gray-900"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Input
                          label="Job Title"
                          defaultValue="Project Manager"
                          variant="bordered"
                          labelPlacement="outside"
                          className="bg-gray-900"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 my-8" />
                
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Preferences</h3>
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-white font-medium">Email Notifications</div>
                        <div className="text-gray-400 text-sm">Receive email notifications about your account</div>
                      </div>
                      <Switch defaultSelected color="primary" />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-white font-medium">Project Updates</div>
                        <div className="text-gray-400 text-sm">Receive updates on projects you're assigned to</div>
                      </div>
                      <Switch defaultSelected color="primary" />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-white font-medium">Marketing Emails</div>
                        <div className="text-gray-400 text-sm">Receive promotional emails and updates</div>
                      </div>
                      <Switch color="primary" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-8">
                  <Button color="primary">Save Changes</Button>
                </div>
              </div>
            )}
            
            {selected === "company" && (
              <div className="py-8 text-center">
                <Icon icon="lucide:building" className="text-5xl text-gray-400 mx-auto" />
                <div className="text-xl font-medium text-gray-300 mt-4">Company settings coming soon</div>
                <div className="text-sm text-gray-400 max-w-md mx-auto mt-2">
                  We're working on company profile settings, team management, and organization controls.
                </div>
              </div>
            )}
            
            {selected === "notifications" && (
              <div className="py-8 text-center">
                <Icon icon="lucide:bell" className="text-5xl text-gray-400 mx-auto" />
                <div className="text-xl font-medium text-gray-300 mt-4">Notification settings coming soon</div>
                <div className="text-sm text-gray-400 max-w-md mx-auto mt-2">
                  We're working on detailed notification preferences, channels, and schedule settings.
                </div>
              </div>
            )}
            
            {selected === "security" && (
              <div className="py-8 text-center">
                <Icon icon="lucide:shield" className="text-5xl text-gray-400 mx-auto" />
                <div className="text-xl font-medium text-gray-300 mt-4">Security settings coming soon</div>
                <div className="text-sm text-gray-400 max-w-md mx-auto mt-2">
                  We're working on password management, two-factor authentication, and security logs.
                </div>
              </div>
            )}
            
            {selected === "billing" && (
              <div className="py-8 text-center">
                <Icon icon="lucide:credit-card" className="text-5xl text-gray-400 mx-auto" />
                <div className="text-xl font-medium text-gray-300 mt-4">Billing settings coming soon</div>
                <div className="text-sm text-gray-400 max-w-md mx-auto mt-2">
                  We're working on payment methods, subscription management, and billing history.
                </div>
              </div>
            )}
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}