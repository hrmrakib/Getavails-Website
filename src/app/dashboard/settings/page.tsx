"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type TabType = "general" | "password" | "contact";

interface GeneralSettings {
  language: string;
  timezone: string;
  timeFormat: "24" | "12";
  dateFormat: "mm/dd/yyyy" | "dd/mm/yyyy";
}

interface PasswordSettings {
  oldPassword: string;
  newPassword: string;
  retypePassword: string;
}

interface ContactSettings {
  generalEmail: string;
  supportDuration: string;
  contactNumber: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("general");

  // General settings state
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    language: "english",
    timezone: "english",
    timeFormat: "24",
    dateFormat: "dd/mm/yyyy",
  });

  // Password settings state
  const [passwordSettings, setPasswordSettings] = useState<PasswordSettings>({
    oldPassword: "",
    newPassword: "",
    retypePassword: "",
  });

  // Contact settings state
  const [contactSettings, setContactSettings] = useState<ContactSettings>({
    generalEmail: "",
    supportDuration: "",
    contactNumber: "",
  });

  const handleGeneralSave = () => {
    toast("Settings saved");
  };

  const handlePasswordSave = () => {
    if (
      !passwordSettings.oldPassword ||
      !passwordSettings.newPassword ||
      !passwordSettings.retypePassword
    ) {
      toast("Please fill in all password fields.");
      return;
    }

    if (passwordSettings.newPassword !== passwordSettings.retypePassword) {
      toast("New passwords do not match.");
      return;
    }

    toast("Your password has been changed successfully.");

    // Clear password fields after successful save
    setPasswordSettings({
      oldPassword: "",
      newPassword: "",
      retypePassword: "",
    });
  };

  const handleContactSave = () => {
    toast("Your contact information has been updated successfully.");
  };

  const tabs = [
    { id: "general" as TabType, label: "General" },
    { id: "password" as TabType, label: "Password" },
    { id: "contact" as TabType, label: "Contact" },
  ];

  return (
    <div className='max-w-2xl p-4 sm:p-6 lg:p-14'>
      <div className='bg-card'>
        {/* Tab Navigation */}
        <div className='border-b border-border'>
          <nav className='flex space-x-8 px-6 py-4 overflow-x-auto'>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className='p-6'>
          {/* General Tab */}
          {activeTab === "general" && (
            <div className='space-y-6'>
              <div className='space-y-2'>
                <Label htmlFor='language'>Language</Label>
                <Select
                  value={generalSettings.language}
                  onValueChange={(value) =>
                    setGeneralSettings({ ...generalSettings, language: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select language' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='english'>English (Default)</SelectItem>
                    <SelectItem value='spanish'>Spanish</SelectItem>
                    <SelectItem value='french'>French</SelectItem>
                    <SelectItem value='german'>German</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='timezone'>Timezone</Label>
                <Select
                  value={generalSettings.timezone}
                  onValueChange={(value) =>
                    setGeneralSettings({ ...generalSettings, timezone: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select timezone' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='english'>English (Default)</SelectItem>
                    <SelectItem value='utc'>UTC</SelectItem>
                    <SelectItem value='est'>EST</SelectItem>
                    <SelectItem value='pst'>PST</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-3'>
                <Label>Time Format</Label>
                <RadioGroup
                  value={generalSettings.timeFormat}
                  onValueChange={(value: "24" | "12") =>
                    setGeneralSettings({
                      ...generalSettings,
                      timeFormat: value,
                    })
                  }
                  className='flex flex-col sm:flex-row gap-4'
                >
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='24' id='24hours' />
                    <Label htmlFor='24hours' className='cursor-pointer'>
                      24 Hours
                    </Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='12' id='12hours' />
                    <Label htmlFor='12hours' className='cursor-pointer'>
                      12 Hours
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className='space-y-3'>
                <Label>Date Format</Label>
                <RadioGroup
                  value={generalSettings.dateFormat}
                  onValueChange={(value: "mm/dd/yyyy" | "dd/mm/yyyy") =>
                    setGeneralSettings({
                      ...generalSettings,
                      dateFormat: value,
                    })
                  }
                  className='flex flex-col sm:flex-row gap-4'
                >
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='mm/dd/yyyy' id='mmddyyyy' />
                    <Label htmlFor='mmddyyyy' className='cursor-pointer'>
                      mm/dd/yyyy
                    </Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='dd/mm/yyyy' id='ddmmyyyy' />
                    <Label htmlFor='ddmmyyyy' className='cursor-pointer'>
                      dd/mm/yyyy
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                onClick={handleGeneralSave}
                className='!w-full h-12 bg-[#235789] sm:w-auto'
              >
                Save Changes
              </Button>
            </div>
          )}

          {/* Password Tab */}
          {activeTab === "password" && (
            <div className='space-y-6'>
              <div className='space-y-2'>
                <Label htmlFor='oldPassword'>Old Password</Label>
                <Input
                  id='oldPassword'
                  type='password'
                  className='h-12 bg-[#F2F2F2] text-black'
                  placeholder='Enter your old password'
                  value={passwordSettings.oldPassword}
                  onChange={(e) =>
                    setPasswordSettings({
                      ...passwordSettings,
                      oldPassword: e.target.value,
                    })
                  }
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='newPassword'>New Password</Label>
                <Input
                  id='newPassword'
                  type='password'
                  className='h-12 bg-[#F2F2F2] text-black'
                  placeholder='Enter your new password'
                  value={passwordSettings.newPassword}
                  onChange={(e) =>
                    setPasswordSettings({
                      ...passwordSettings,
                      newPassword: e.target.value,
                    })
                  }
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='retypePassword'>Retype New Password</Label>
                <Input
                  id='retypePassword'
                  type='password'
                  className='h-12 bg-[#F2F2F2] text-black'
                  placeholder='Re-type your new password'
                  value={passwordSettings.retypePassword}
                  onChange={(e) =>
                    setPasswordSettings({
                      ...passwordSettings,
                      retypePassword: e.target.value,
                    })
                  }
                />
              </div>

              <Button
                onClick={handlePasswordSave}
                className='!w-full h-12 bg-[#235789] sm:w-auto'
              >
                Save Changes
              </Button>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === "contact" && (
            <div className='space-y-6'>
              <div className='space-y-2'>
                <Label htmlFor='generalEmail'>
                  General Enquiries Email Address
                </Label>
                <Input
                  id='generalEmail'
                  type='email'
                  className='h-12 bg-[#F2F2F2] text-black'
                  placeholder='Enter email address'
                  value={contactSettings.generalEmail}
                  onChange={(e) =>
                    setContactSettings({
                      ...contactSettings,
                      generalEmail: e.target.value,
                    })
                  }
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='supportDuration'>Support Duration</Label>
                <Input
                  id='supportDuration'
                  type='text'
                  className='h-12 bg-[#F2F2F2] text-black'
                  placeholder='Enter Supporting time'
                  value={contactSettings.supportDuration}
                  onChange={(e) =>
                    setContactSettings({
                      ...contactSettings,
                      supportDuration: e.target.value,
                    })
                  }
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='contactNumber'>Contact Number</Label>
                <Input
                  id='contactNumber'
                  type='tel'
                  className='h-12 bg-[#F2F2F2] text-black'
                  placeholder='Enter phone number'
                  value={contactSettings.contactNumber}
                  onChange={(e) =>
                    setContactSettings({
                      ...contactSettings,
                      contactNumber: e.target.value,
                    })
                  }
                />
              </div>

              <Button
                onClick={handleContactSave}
                className='!w-full h-12 bg-[#235789] sm:w-auto'
              >
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
