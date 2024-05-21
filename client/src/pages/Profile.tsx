import { Page } from "../components/layout/Page";
import { homeMenu } from "../menu";

const Profile = () => {
	return (
		<Page title={homeMenu.profile.title}>
			<div>profile</div>
		</Page>
	);
};

export default Profile;
