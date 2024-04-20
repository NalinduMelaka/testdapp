import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

export function Signuptabs() {
  const data = [
    {
      label: "Patient",
      value: "Patient",

    },
    {
      label: "Doctor",
      value: "Doctor",

    }
  ];

  return (
    <Tabs id="custom-animation" value="html">
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  );
}