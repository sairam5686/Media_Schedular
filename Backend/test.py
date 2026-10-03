from postpeer import PostPeer

with PostPeer() as client:
    result = client.health.verify_access_key()
    print(result)