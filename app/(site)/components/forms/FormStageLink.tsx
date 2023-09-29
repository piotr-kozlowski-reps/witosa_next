type Props = {
  linkName: string;
  // usersData: TGetAllUsersResponse;
  // cyclicalActivitiesData: TGetAllCyclicalActivitiesResponse;
};

export default function FormStageLink(props: Props) {
  ////vars
  const { linkName } = props;

  ////tsx
  return <div>{linkName}</div>;
}
