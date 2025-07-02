import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function Home() {
  return(
    <div className="p-4">

    <div className="flex flex-col gap-y-4">
      <div>
        <Button variant="elevated">
          I am a button
        </Button>
      </div>
      <div>
        <Input placeholder="I'm an input" />
      </div>
        <div>
        <Progress value={50} />
      </div>
         <div>
          <Textarea placeholder="I'm a text area"/>

      </div>
               <div>
                <Checkbox />
      </div>
    </div>
    </div>
  )
}
