// { Driver Code Starts
import java.util.*;
import java.lang.*;
import java.io.*;
class GFG
{
    public static void main(String[] args) throws IOException
    {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int T = Integer.parseInt(br.readLine().trim());
        while(T-->0)
        {
            int n = Integer.parseInt(br.readLine().trim());
            int[] nums = new int[n];
            String[] S = br.readLine().trim().split(" ");
            for(int i = 0; i < n; i++)
                nums[i]  =Integer.parseInt(S[i]);
            int k = Integer.parseInt(br.readLine().trim());
            Solution obj = new Solution();
            System.out.println(obj.solveWordWrap(nums, k));
        }
    }
}
// } Driver Code Ends

//{3,2,2,5} k=6
// 3  
// 2+1+2
// Remaining 3^2 + 1^2 = 10 need to follow sequence 
class Solution
{
    public int square(int n)
    {
        return n*n;
    }
    public int solingWord(int[] nums,int[][] memo,int k,int n, int wordIndex,int remLength)
    {
        //base case for last word
        if(wordIndex==n-1){
            memo[wordIndex][remLength]= nums[wordIndex]< remLength?0:square(remLength);
            return memo[wordIndex][remLength];
        }

        //normal word
        int currWord=nums[wordIndex];
        if(currWord<remLength)
        {
            //consider the word
            
            return Math.min(square(remLength)+ solvingWrapMemo(nums,memo,k,n,wordIndex+1,k-currWord), 
            solvingWrapMemo(nums,memo,k,n,wordIndex+1,remLength==k?remLength-currWord:remLength-currWord-1));
        }
        else
        {
            //go to new line
            return square(remLength)+solvingWrapMemo(nums,memo,k,n,wordIndex+1,k-currWord);
        }


    }
    public int solvingWrapMemo(int[] nums,int[][] memo,int k,int n,int wordIndex,int remLength)
    {
        if(memo[wordIndex][remLength]!=-1)
            return memo[wordIndex][remLength];

        memo[wordIndex][remLength]=solingWord(nums,memo,k,n,wordIndex,remLength);
        return memo[wordIndex][remLength];
    }
    public int solveWordWrap (int[] nums, int k)
    {
       // Code here
       int n =nums.length;
       int[][] memo=new int[n][k+1];
       for(int i=0;i<n;i++)
       {
           Arrays.fill(memo[i],-1);
       }
        return solvingWrapMemo(nums,memo,k,n,0,k);
    }
}