import { useEffect, useState } from "react";
import { useWidgetStore, useSignUpStore } from "@/shared";
import { useQuery } from "@tanstack/react-query";
import { skillApi } from "@/connection";
import { Skill } from "@/interface";
import { Layout } from "@/design";

export default function Skills() {
  const [keyword, setKeyword] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  const { setView, removeView } = useWidgetStore();
  const { setSignUpData } = useSignUpStore();
  const { data: techs, isLoading } = useQuery({
    queryKey: ["techs"],
    queryFn: skillApi.getAll,
  });

  useEffect(() => {
    setSignUpData({ skillIds: selectedSkills });
  }, [selectedSkills]);

  const findSkill = (props: Skill[]) => {
    const result = props.filter(({ skillName }) => skillName.includes(keyword));
    return result;
  };
  if (!techs || isLoading) return <div>Not Found</div>;

  return (
    <Layout.SignUp
      titles={{ title: "보유 스킬 입력" }}
      inputs={[
        {
          state: [keyword, setKeyword],
          placeholder: "스킬을 검색해보세요.",
        },
      ]}
      buttons={[
        [
          "확인",
          () => {
            removeView("skills");
            return setView("personalInformation");
          },
        ],
      ]}
    >
      <div className="flex flex-col gap-2">
        <div className="font-bold">빠른 선택</div>
        <div className="flex max-h-84 w-full flex-wrap gap-2 overflow-hidden">
          {findSkill(techs).map(({ id, skillName }) => (
            <button
              key={id}
              onClick={() => setSelectedSkills([id, ...selectedSkills])}
              className={
                `${
                  selectedSkills.includes(id)
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "bg-white"
                } ` +
                "font-bold flex h-10 grow items-center justify-center rounded-full border-2 px-4 duration-500"
              }
            >
              {skillName}
            </button>
          ))}
        </div>
      </div>
    </Layout.SignUp>
  );
}
