#include <bits/stdc++.h>
using namespace std;
int a[1021][3];
void quicksort(int start, int end);
int main()
{
    int n;
    cin>>n;
    for (int i = 1; i <= n; i++)
    {
        cin >> a[i][1] >> a[i][2];
    }
    quicksort(1, n);
    int sum=0;
    int now=0;
    for(int i=1;i<=n;i++)
    {
        if(a[i][1]>=now)
        {
            sum++;
            now=a[i][2];
        }
    }
    cout<<sum;
}
void quicksort(int start, int end)
{
    if (start > end)
        return;
    else
    {
        int low = start;
        int high = end;
        int temp2 = a[low][2];
        int temp1 = a[low][1];
        while (low < high)
        {
            while (low < high && temp2 < a[high][2])
                high--;
            if (low < high)
            {
                a[low][2] = a[high][2];
                a[low][1] = a[high][1];
                low++;
            }
            while (low < high && temp2 > a[low][2])
                low++;
            if (low < high)
            {
                a[high][2] = a[low][2];
                a[high][1] = a[low][1];
                high--;
            }
        }
        a[low][2] = temp2;
        a[low][1] = temp1;
        int mid=low;
        quicksort(start, mid - 1);
        quicksort(mid + 1, end);
    }
}