import { Page } from "../components/layout/Page";
import { RootState } from "../store";
import { useAppSelector } from "../store/hooks";
import { homeMenu } from "../menu";
import { Card, CardBody, CardHeader } from "../components/elements/Card/Card";

const Dashboard: React.FC = () => {
	const userInfo = useAppSelector((state: RootState) => state.userInfo);

	return (
		<Page title={homeMenu.dashboard.title}>
			<Card>
				<CardHeader>Wellcome to my project {userInfo.firstName}!</CardHeader>
				<CardBody>
					<div>Email : {userInfo.email}</div>
					<div>
						Created Date : {userInfo.createdAt && new Date(userInfo.createdAt).toLocaleDateString()}
					</div>
				</CardBody>
			</Card>
		</Page>
	);
};

export default Dashboard;
