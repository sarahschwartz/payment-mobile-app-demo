import { User } from '../types';

// Mock current user
export const currentUser: User = {
  address: '0x36615Cf349d7F6344891B1e7CA7C72883F5dc049',
};

// Mock friends
export const friends: User[] = [
  {
    address: '0xa61464658AfeAf65CccaaFD3a512b69A83B77618',
    name: 'Sarah Miller',
    isFriend: true,
  },
  {
    address: '0x0D43eB5B8a47bA8900d84AA36656c92024e9772e',
    name: 'David Chen',
    isFriend: true,
  },
  {
    address: '0xA13c10C0D5bd6f79041B9835c63f91de35A15883',
    name: 'Emma Wilson',
    isFriend: true,
  },
  {
    address: '0x8002cD98Cfb563492A6fB3E7C8243b7B9Ad4cc92',
    name: 'James Taylor',
    isFriend: true,
  },
  {
    address: '0x4F9133D1d3F50011A6859807C837bdCB31Aaab13',
    name: 'Olivia Martinez',
    isFriend: true,
  }
];
