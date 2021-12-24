import { observer } from 'mobx-react-lite';
import React from 'react';
import { Tab } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import ProfileAbout from './ProfileAbout';
import ProfileActivities from './ProfileActivities';
import ProfilePhotos from './ProfilePhotos';

interface Props {
    profile: Profile;
}

export default observer(function ProfileContent({ profile }: Props) {
    const panes = [
        { menuItem: 'Apie', render: () => <ProfileAbout /> },
        { menuItem: 'Nuotraukos', render: () => <ProfilePhotos profile={profile} /> },
        { menuItem: 'Renginiai', render: () => <ProfileActivities />}
    ]

    return (
        <Tab
            menu={{ fluid: true, vertical: true }}
            menuPosition='right'
            panes={panes}
        />
    )
})